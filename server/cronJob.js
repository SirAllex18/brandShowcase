import Counter from "./models/Counter.js";
import cron from "node-cron";

// Define the getMatchDay function
export const increaseCounter = async () => {
  try {
    const counter = await Counter.findOne();

    if (!counter) {
      console.error("Counter document not found");
      return;
    }

    if(counter.end > 55){
        counter.start = 0;
        counter.end = 3;
    }else{
        counter.start += 1;
        counter.end += 1;
    }

    await counter.save();

  } catch (err) {
    console.error("Error getting match information", err);
  }
};

cron.schedule('0 */3 * * *', () => {
  console.log('Running increaseCounter every 3 hours');
  increaseCounter();
});

// 5 mins */5 * * * *