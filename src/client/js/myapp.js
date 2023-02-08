// Grabs the DOM elements needed for main event listener,
// and returns an object with the new variables
export function getResults() {
  const resultsAgreement = document.getElementById("agreement");
  const resultsConfidence = document.getElementById("confidence");
  const resultsIrony = document.getElementById("irony");
  const resultsScore = document.getElementById("score");
  return { resultsAgreement, resultsConfidence, resultsIrony, resultsScore };
}

export function submitListener(event) {
  event.preventDefault();
  // Event listener for form submit button
  document.getElementById("submit").addEventListener("click", async (e) => {
    e.preventDefault();
    // Holds the returned variables in a new object named 'results'
    const results = getResults();
    // Destructure 'results' variable
    const { resultsAgreement, resultsConfidence, resultsIrony, resultsScore } =
      results;
    const userURL = document.getElementById("url").value;

    // Loops over the 'results' object, and changes the text contet
    // to 'Loading...' to indicate that something is happening
    for (const result in results) {
      results[result].textContent = "Loading...";
    }

    const formdata = new FormData();
    formdata.append("key", "");
    formdata.append("url", userURL);
    formdata.append("lang", "en"); // 2-letter code, like en es fr ...

    const requestOptions = {
      method: "POST",
      body: formdata,
      redirect: "follow",
    };

    const response = await fetch(
      "https://api.meaningcloud.com/sentiment-2.1",
      requestOptions
    )
      .then((response) => response.json())
      .then((response) => {
        console.log(response);
        resultsAgreement.textContent = response.agreement;
        resultsConfidence.textContent = response.confidence;
        resultsIrony.textContent = response.irony;
        resultsScore.textContent = response.score_tag;
      })
      .catch((error) => console.log("error", error));
  });
}
