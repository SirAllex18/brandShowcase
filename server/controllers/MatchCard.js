import Counter from "../models/Counter.js";

export const getMatchDay = async (req, res) => {
  try {
    const flag = req.params.flag === "true";
    const counter = await Counter.findOne();

    const start = counter.start;
    const end = counter.end;

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

    const response = await matchDay.json();
    const fixture = response.response;

    const reversedFixtures = fixture.reverse();
    const selectedFixtures = reversedFixtures.slice(start, end);

    const result = [];

    if (!flag) {

      for (let i = start; i < selectedFixtures.length; i++) {
        result.push({
          referee: selectedFixtures[i].fixture.referee,
          venue: selectedFixtures[i].fixture.venue.name,
          competitionLogo: selectedFixtures[i].league.logo,
          awayTeam: selectedFixtures[i].teams.away,
          homeTeam: selectedFixtures[i].teams.home,
          score: selectedFixtures[i].score.fulltime,
          date: selectedFixtures[i].fixture.date
        });
      }
    } else {
      const oneMatch = await getOneMatch(selectedFixtures);
      console.log("else");
      result.push(oneMatch);
    }

    counter.start = counter.end;
    counter.end += 3;
    console.log(result)
    res.status(200).json(result);
  } catch (err) {
    console.log(err);
    res.status(500).send("Error getting match information");
  }
};

const getOneMatch = async (selectedFixtures) => {
  try {
    const result = {
      referee: selectedFixtures[0].fixture.referee,
      venue: selectedFixtures[0].fixture.venue.name,
      competitionLogo: selectedFixtures[0].league.logo,
      awayTeam: selectedFixtures[0].teams.away,
      homeTeam: selectedFixtures[0].teams.home,
      score: selectedFixtures[0].score.fulltime,
      date: selectedFixtures[0].fixture.date.split("T")[0],
    };

    return result;
  } catch (err) {
    return err;
  }
};
