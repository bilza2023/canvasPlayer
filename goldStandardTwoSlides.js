

// goldStandardTwoSlides.js

export const presentationData = {
    designWidth: 1020,
    designHeight: 576,
    totalDuration: 10,  
    
    slidesData: [
      {
        startTime: 0,
        endTime: 5,
        background: { backgroundColor: "#127203" },
        items: [
          {
            type: "text",
            text: "Slide One",
            x: 100,
            y: 100,
            fontSize: 80,
            fontFamily: "Arial",
            color: 0xffffff,
            textAlign: "left",
            lineHeight: 1.2,
            padding: 10,
            animate:[
              {
                  type: "move",
                  start: 0,
                  end: 2,
                  props: {
                    fromX: 1020,
                    toX: 100,
                    fromY: 200,
                    toY: 200,
                    primitive: "easeOut"
                  }
              }
            ]
          }
        ]
      },
      {
        startTime: 5,
        endTime: 10,
        background: { backgroundColor: "#003366" },
        items: [
          {
            type: "text",
            text: "Slide Two",
            x: 100,
            y: 100,
            fontSize: 80,
            fontFamily: "Arial",
            color: 0xffcc00,
            textAlign: "left",
            lineHeight: 1.2,
            padding: 10,
            animate: []
          }
        ]
      }
    ]
  };
  