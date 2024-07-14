function DescriptionFormater({ description }: { description: string }) {
  const wordsArray = description.split(" ");
  let text: string[] | string = [];
  let paragraphArray: string[] | string = [];
  let counter = 0;
  for (const word of wordsArray) {
    paragraphArray = [...paragraphArray, word];
    if (word.includes(".")) {
      counter++;
      if (counter === 6) {
        counter = 0;
        text = [...text, paragraphArray];
        paragraphArray = [];
      }
    }
  }

  return (
    <>
      {text.map((paragraph) => {
        let paragraphString = paragraph.toString();
        paragraphString = paragraphString.replaceAll(",", " ");
        paragraphString = paragraphString.replaceAll("  ", " ");
        return (
          <div key={paragraph}>
            <br />
            <p>{paragraphString}</p>
            <br />
          </div>
        );
      })}
    </>
  );
}

export default DescriptionFormater;
