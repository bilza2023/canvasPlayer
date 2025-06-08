// goldStandard.js

export const presentationData = {
  designWidth: 1020,
  designHeight: 576,
  totalDuration: 5,
  slidesData: [
    {
      startTime: 0,
      endTime: 5,
      background: { backgroundColor: "#467ae2" },

      items: [
        {
          // Icon
          type: "icon",
          iconName: "ROCKET",
          x: 560,
          y: 120,
          width: 300,
          height: 300,
          color: 0xffffff,
          animate: [
            {
              field: "y",
              fn: "moveTo",
              start: 0.7,
              end: 2.0,
              props: { fromY: 120, toY: 80 }
            }
          ]
        },

        {
          // Title text
          type: "text",
          text: "Welcome to Taleem",
          x: 100,
          y: 200,
          width: 820,
          height: 100,
          fontSize: 80,
          fontFamily: "Arial",
          color: 0xffffff,
          textAlign: "center",
          lineHeight: 1.1,
          padding: 10
          // No animation for now
        }
      ]
    }
  ]
};
