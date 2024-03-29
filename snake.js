var canvas = document.getElementById("gameCanvas");
      var ctx = canvas.getContext("2d");
      var w = canvas.width;
      var h = canvas.height;

      var cw = 10;
      var food;
      var snake;
      var direction;
      var score;

      ctx.strokeStyle = "black";
      ctx.strokeRect(0, 0, w, h);

      function init() {
        // Create a snake object
        create_snake();
        // Create a food object
        create_food();
        // Start the game
        score = 0;
        direction = "right"; // Initial direction
        windows.onkeydown = keyEvent; // Start listening for key presses
        if (typeof game_loop != "undefined") clearInterval(game_loop);
        game_loop = setInterval(paint, 80);
      }
      init();

      function create_snake() {
        var snake_length = 5;
        snake = [];
        for (var i = snake_length - 1; i >= 0; i--) {
          snake.push({
            x: i,
            y: 0
          });
        }
      }

      function create_food() {
        food = {
          x: Math.round(Math.random() * (w - cw) / cw),
          y: Math.round(Math.random() * (h - cw) / cw)
        };
      }

      function paintCanvas() {
        ctx.fillStyle = "white";
        ctx.fillRect(0, 0, w, h);
        ctx.strokeStyle = "black";
        ctx.strokeRect(0, 0, w, h);

        var hx = snake[0].x;
        var hy = snake[0].y;

        if (direction == "right") hx++;
        else if (direction == "left") hx--;
        else if (direction == "up") hy--;
        else if (direction == "down") hy++;

        hx++;

        if (hx == w / cw || hx == -1 || hy == -1 || hy == h /cw || check_collision(hx, hy, snake)) {
          init();
          return;
        }

        if (hx == food.x && hy == food.y) {
          score++;
          create_food();
        }
        else {
          snake.pop();
        }

        var new_head = {
          x: hx,
          y: hy
        };
        snake.unshift(new_head);

        for (var i=0; i<snake.length; i++) {
          paint_cell(snake[i].x, snake[i].y);
        }
        paint_cell(food.x, food.y);

        ctx.fillStyle = "black";
        ctx.font = "20px Arial";
        ctx.fillText("Score: " + score, 10, h - 10);
      }

      function paint_cell(x,y) {
        ctx.fillStyle = "black";
        ctx.fillRect(x*cw, y*cw, cw, cw);
        ctx.strokeStyle = "white";
        ctx.strokeRect(x*cw, y*cw, cw, cw);
      }

      function check_collision(x,y,array) {
        for (var i = 0; i < array.length; i++) {
          if (array[i].x == x && array[i].y == y)
            return true;
        }
        return false;
      }

      function keyEvent(e) {
        var key = e.which;
        if (key == "37" && direction != "right") direction = "left";
        else if (key == "38" && direction != "down") direction = "up";
        else if (key == "39" && direction != "left") direction = "right";
        else if (key == "40" && direction != "up") direction = "down";
      }