const Messages = ({ messages }) => {
  let leftTopHtml = null;
  let rightTopHtml = null; // для начала определяет переменные, которые содержать html для определённой части страниц.
  let rightDownHtml = null; // они сначала Null, если html есть, то они меняются. Так можно проверить, есть ли в них Html.
  let leftDownHtml = null;

  const rightTop = messages.filter((message) => {
    return message.place === "rightTop";
  });

  const leftTop = messages.filter((message) => {
    // сообщения для разных расположений фильтруются в отдельные массивы.
    return message.place === "leftTop";
  });

  const rightDown = messages.filter((message) => {
    return message.place === "rightDown";
  });

  const leftDown = messages.filter((message) => {
    return message.place === "leftDown";
  });

  const leftDownHeight = 80 - leftDown.length * 0.5;
  const rightDownHeight = 80 - rightDown.length * 0.5; // расчитывается одельно значение top в стилях для нижних сообщений
  // чтобы они не залезли за границу окна.
  if (leftTop) {
    leftTopHtml = leftTop.map((message) => {
      const size = `1.${message.fontSize}`;
      const color = `#${message.color}`;
      return (
        <div
          key={message._id}
          style={{ color: `${color}`, fontSize: `${size}em` }}
        >
          <p>{message.message}</p>
          <p>{message.name}</p>
        </div>
      );
    });
  }

  if (rightTop) {
    rightTopHtml = rightTop.map((message) => {
      // из всех групп сообщений делается html.
      const size = `1.${message.fontSize}`;
      console.log("size messages", size, typeof size);
      const color = `#${message.color}`;
      return (
        <div
          key={message._id}
          style={{ color: `${color}`, fontSize: `${size}em` }}
        >
          <p>{message.message}</p>
          <p>{message.name}</p>
        </div>
      );
    });
  }

  if (rightDown) {
    rightDownHtml = rightDown.map((message) => {
      const size = `1.${message.fontSize}`;
      const color = `#${message.color}`;
      return (
        <div
          key={message._id}
          style={{ color: `${color}`, fontSize: `${size}em` }}
        >
          <p>{message.message}</p>
          <p>{message.name}</p>
        </div>
      );
    });
  }

  if (leftDown) {
    leftDownHtml = leftDown.map((message) => {
      const size = `1.${message.fontSize}`;
      const color = `#${message.color}`;
      return (
        <div
          key={message._id}
          style={{ color: `${color}`, fontSize: `${size}em` }}
        >
          <p>{message.message}</p>
          <p>{message.name}</p>
        </div>
      );
    });
  }
  // собираем конечный html со всеми сообщениями.
  return (
    <>
      <div style={{ position: "absolute", top: "10%", left: "10%" }}>
        {leftTopHtml ? leftTopHtml : ""}
      </div>
      <div style={{ position: "absolute", top: "10%", right: "10%" }}>
        {rightTopHtml ? rightTopHtml : ""}
      </div>
      <div
        style={{ position: "absolute", top: `${leftDownHeight}%`, left: "10%" }}
      >
        {leftDownHtml ? leftDownHtml : ""}
      </div>
      <div
        style={{
          position: "absolute",
          top: `${rightDownHeight}%`,
          right: "10%",
        }}
      >
        {rightDownHtml ? rightDownHtml : ""}
      </div>
    </>
  );
};

export default Messages;
