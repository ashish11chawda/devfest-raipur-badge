const canvas = document.querySelector("canvas");
    const ctx = canvas.getContext("2d");
    let image = "";
    let shape = "original";
    document.getElementById("download").style.visibility = "hidden";

    const uploadImage = () => {
      document.querySelector("input.profile-input").click();
      document.getElementById("download").style.visibility = "visible";
    };

    const changeShape = (type) => {
      const original = document.querySelector(
        ".select-container .select#original"
      );
      const square = document.querySelector(".select-container .select#square");
      const circle = document.querySelector(".select-container .select#circle");
      shape = type;
      switch (type) {
        case "original": {
          original.setAttribute("selected", "");
          square.removeAttribute("selected");
          circle.removeAttribute("selected");
          break;
        }
        case "square": {
          square.setAttribute("selected", "");
          original.removeAttribute("selected");
          circle.removeAttribute("selected");
          break;
        }
        case "circle": {
          circle.setAttribute("selected", "");
          original.removeAttribute("selected");
          square.removeAttribute("selected");
          break;
        }
      }
      draw();
    };

    const upload = (e) => {
      if (e && e.target.files && e.target.files[0]) {
        const reader = new FileReader();
        reader.onload = (event) => {
          const img = new Image();
          img.onload = () => {
            image = img;
            draw();
          };
          img.src = event.target.result;
        };
        reader.readAsDataURL(e.target.files[0]);
      }
    };

    const banner = new Image();
    banner.src = "./badge-gcr1.png";
    banner.onload = () => {
      draw();
    };
	
	const milestone1 = () => {
      banner.src = "./badge-gcr1.png";
    };
	const milestone2 = () => {
      banner.src = "./badge-gcr2.png";
    };
	const milestone3 = () => {
      banner.src = "./badge-gcr3.png";
    };
	const milestone4 = () => {
      banner.src = "./badge-gcr4.png";
    };

    const draw = () => {
      if (image) {
        switch (shape) {
          case "original": {
            canvas.width = image.width;
            canvas.height = image.height;
            ctx.drawImage(image, 0, 0);
            break;
          }
          default: {
            const size = Math.min(image.width, image.height);
            canvas.width = 500;
            canvas.height = 500;
            const hRatio = canvas.width / image.width;
            const vRatio = canvas.height / image.height;
            const ratio = Math.max(hRatio, vRatio);
            const x = (canvas.width - image.width * ratio) / 2;
            const y = (canvas.height - image.height * ratio) / 2;
            ctx.drawImage(
              image,
              0,
              0,
              image.width,
              image.height,
              x,
              y,
              image.width * ratio,
              image.height * ratio
            );
            break;
          }
        }
      } else {
        ctx.canvas.width = 500;
        ctx.canvas.height = 500;
        ctx.fillStyle = "#9fc1f9";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      }

      const height = (banner.height / banner.width) * canvas.width;
      const y = canvas.height - height;
      const fontSize = canvas.width / 17.2;
      const fontY = y + height * 0.7;
      ctx.drawImage(
        banner,
        0,
        0,
        banner.width,
        banner.height,
        0,
        y,
        canvas.width,
        height
      );

      ctx.fillStyle = "#757575";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.font = `${fontSize}px Google Sans, sans-serif`;
      // ctx.fillText(category, canvas.width / 2, fontY)

      if (shape === "circle") {
        ctx.globalCompositeOperation = "destination-in";
        ctx.beginPath();
        ctx.arc(
          canvas.width / 2,
          canvas.height / 2,
          canvas.height / 2,
          0,
          Math.PI * 2
        );
        ctx.closePath();
        ctx.fill();
      }
    };

    const download = () => {
      const a = document.createElement("a");
      const url = canvas.toDataURL("image/png;base64");
      a.download = "badge.png";
      a.href = url;

      a.click();
    };