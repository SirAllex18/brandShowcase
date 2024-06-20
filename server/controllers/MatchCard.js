import Counter from "../models/Counter.js";
import Stats from "../models/gameStatistics.js";
import fetch from "node-fetch";
import OpenAI from "openai";

export const getMatchDay = async (req, res) => {
  try {
    const counter = await Counter.findOne();

    if (!counter) {
      return res.status(404).send("Counter document not found");
    }

    const start = counter.start;
    const end = counter.end;

    const getFixtureStats = async (id, flag = true) => {
      const response = await fetch(
        `https://api-football-v1.p.rapidapi.com/v3/fixtures/statistics?fixture=${id}`,
        {
          method: "GET",
          headers: {
            "X-RapidAPI-Key":
              "fbd96c8e6bmsh8286ba40ae72868p1d6189jsn7a84ad90f8bd",
            "X-RapidAPI-Host": "api-football-v1.p.rapidapi.com",
          },
        }
      );

      if (flag) {
        const dataStats = await response.json();
        return dataStats.response.find(
          (team) => team.team.name === "Real Madrid"
        );
      } else {
        const dataStats = await response.json();
        return dataStats;
      }
    };

    const matchDay = await fetch(
      `https://api-football-v1.p.rapidapi.com/v3/fixtures?season=2023&team=541&last=55`,
      {
        method: "GET",
        headers: {
          "X-RapidAPI-Key":
            "fbd96c8e6bmsh8286ba40ae72868p1d6189jsn7a84ad90f8bd",
          "X-RapidAPI-Host": "api-football-v1.p.rapidapi.com",
        },
      }
    );

    const openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });

    const response = await matchDay.json();
    const fixtures = response.response;

    if (fixtures.length === 0) {
      return res.status(404).send("No fixtures found");
    }

    const reversedFixtures = fixtures.reverse();
    const selectedFixtures = reversedFixtures.slice(start, end);

    if (selectedFixtures.length === 0) {
      return res.status(200).json([]);
    }

    let statsDocument = await Stats.findOne();
    if (!statsDocument) {
      statsDocument = new Stats();
    }

    // Construct the message for OpenAI
    const getPredictionAI = async (gameInfo, teamsInfo, score, teams) => {
      const resultArray = statsDocument.results.map((item) => item.result);
      const chatHistory = [
        {
          role: "system",
          content:
            "You are a helpful assistant specialized in football statistics and predictions.",
        },
        {
          role: "user",
          content: `I will provide you with statistics about Real Madrid football team, and I want you to generate match win probabilities based on those statistics. I will provide match statistics from the most recent game
             that Real Madrid has played, the most important statistics that you should consider are: "Total Shots" - a higher numbers means that the team attacked a lot and had many chances, the more chances you get the higher
             probabilty of you winning the game is, "Ball Possesion" - a higher percentage of ball possesion means you had more control of the game and thus your chances of winning slightly increase, not by much, but they incrase,
             "Red Cards" - if the number is different than null then the winning chances decrease playing with 1 or more players in disadvantage is difficult to do so, "expected_goals" - this one is an important one, more important than the
             Total Shots if the expected goals has a value higher than 2 it means that the team played a great game and had really big opportunities during the game.`,
        },
        {
          role: "user",
          content: `Another important factor in determining the form of a football club is their streak of results, ${resultArray} here is an array of the results that Real Madrid has achieved so far. While the whole array can give an idea of how the overall season went for the team
          ,it is important to calculate a streak of results only the last 4 elements of the array, the others are too old to influence the upcoming games and now to explain the elements of the array if the element is equal to W that means that is a Won game, L is for Lost and D is for Draw. A series of recent consecutive W means the team is 
          going through a very good period increasing their chances of winning next games though opposite comes for many L in a row, that means the team is struggling and will lack confidence for upcoming games, a mixed serie of results that combine losses, draws and wins
          will also slightly decrease the win probability of upcoming games. So to give an example, if the last 4 elements of the array look like: W,W,W,D,W that means the team goes through a good period, L,D,W,D,W this series are mixed and 
          could lead to poor results in the future as well.`,
        },
        {
          role: "user",
          content: `Here is the information about the last match that Real Madrid played, the game was ${
            teamsInfo.homeTeam
          } vs ${teamsInfo.awayTeam}, the score ended: ${score.home} - ${
            score.away
          } and here are the match statistics: ${JSON.stringify(gameInfo)}`,
        },
        {
          role: "user",
          content: `Based on this information, can you generate a match win probability for the next game that is between ${teams.home.name} and ${teams.away.name}?`,
        },
      ];

      // Make the API call to OpenAI
      const completion = await openai.chat.completions.create({
        messages: chatHistory,
        model: "gpt-4-turbo",
      });
      return completion.choices[0].message.content;
    };

    // Match facts
    const getMatchCommentary = async (gameInfo, awayTeam, homeTeam, score) => {
      const chatHistory = [
        {
          role: "system",
          content:
            "You are a knowledgeable football pundit who is responsible with the post-game commentary of Real Madrid`s football games.",
        },
        {
          role: "user",
          content: `You are responsible for creating the post-match commentary of Real Madrid games, commentary that will be used for Real Madrid's website, in the matches page. I will provide you the match statistics for both teams, statistics
            like: expected goals - which is an important criteria, the higher expected goal, any value over 2 is considered high, means that team had a lot of chances and could score a lot of goals, total shots on target, compare this value to the 
            actual goals that team scored to see if they were scoring their chances, red cards is another aspect that should be considered in the post-match commentary because a team getting a red card is a big disadvantage for them and can influence
            the game, possesision is another factor to analyze a higher percentage means that team controlled the game. Take in consideration you are writing for Real Madrid supporters, be objective with the facts but not too harsh, try to
            encourage the team even if the statistics arent in their advantage.`,
        },
        {
          role: "user",
          content: `Here are the statistics for the match:  ${JSON.stringify(
            gameInfo
          )}. The match was played between the away team: ${awayTeam} and home team: ${homeTeam} and the final result was: ${JSON.stringify(
            score
          )}. One more thing is to generate your answer in romanian.`,
        },
      ];

      // Make the API call to OpenAI
      const completion = await openai.chat.completions.create({
        messages: chatHistory,
        model: "gpt-4-turbo",
      });
      return completion.choices[0].message.content;
    };

    let previousGame = null;
    let teams = null;
    let commentary = "";

    const result = await Promise.all(
      selectedFixtures.map(async (fixture, index) => {
        const stats = await getFixtureStats(fixture.fixture.id);
        const gameStats = await getFixtureStats(fixture.fixture.id, false);
        const gameResult = populateGameHistory(fixture);

        if (index === 0) {
          previousGame = stats;
          teams = {
            homeTeam: fixture.teams.home.name,
            awayTeam: fixture.teams.away.name,
          };
          commentary = await getMatchCommentary(
            gameStats,
            fixture.teams.away.name,
            fixture.teams.home.name,
            fixture.score.fulltime
          );
        }

        const matchProbability =
          index === 1
            ? await getPredictionAI(
                previousGame,
                teams,
                fixture.score.fulltime,
                fixture.teams
              )
            : null;
        const gameExists = statsDocument.results.some(
          (game) => game.gameId === fixture.fixture.id
        );
        if (!gameExists) {
          statsDocument.results.push({
            gameId: fixture.fixture.id,
            result: gameResult,
          });
        }

        return {
          referee: fixture.fixture.referee,
          venue: fixture.fixture.venue.name,
          competitionLogo: fixture.league.logo,
          awayTeam: fixture.teams.away,
          homeTeam: fixture.teams.home,
          score: fixture.score.fulltime,
          date: fixture.fixture.date,
          teamStats: stats,
          probability: index === 1 ? matchProbability : null,
          commentary: commentary,
        };
      })
    );

    await statsDocument.save();
    res.status(200).json(result);
  } catch (err) {
    console.log(err);
    res.status(500).send("Error getting match information");
  }
};

function populateGameHistory(response) {
  let gameResult = "";
  if (
    response.teams.away.name === "Real Madrid" &&
    response.teams.away.winner === true
  ) {
    gameResult = "W";
  } else if (
    response.teams.home.name === "Real Madrid" &&
    response.teams.home.winner === true
  ) {
    gameResult = "W";
  } else if (
    response.teams.away.winner === null &&
    response.teams.home.winner === null
  ) {
    gameResult = "D";
  } else {
    gameResult = "L";
  }
  return gameResult;
}
