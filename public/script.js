// // async function searchWord() {
// //   const term = document.getElementById('search-term').value;
// //   const response = await fetch(`/api/word/${term}`);
// //   const result = await response.json();

// //   if (response.status === 404) {
// //     document.getElementById('result').innerHTML = '<p>Word not found</p>';
// //   } else {
// //     document.getElementById('result').innerHTML = `
// //       <h2 style="color: white; font-size: 24px;">${term}</h2>
// //       <p style="color:white; font-size:15px; font-weight:normal; font-family:sans-serif;"> 
// //         <strong style="color:#bb86fc;">Part of Speech:</strong> ${result.partOfSpeech}
// //       </p>
// //       <p style="color:white; font-size:15px; font-weight:normal; font-family:sans-serif;"> 
// //         <strong style="color:#bb86fc; max-width:20%">Definition:</strong> ${result.definition}
// //       </p>
// //       <p style="color:white; font-size:15px; font-weight:normal; font-family:sans-serif;"> 
// //         <strong style="color:#bb86fc;">Example:</strong> ${result.example}
// //       </p>
// //       <p style="color:white; font-size:15px; font-weight:normal; font-family:sans-serif;"> 
// //         <strong style="color:#bb86fc;">Pronunciation:</strong> ${result.pronunciation}
// //       </p>
// //         <strong style="color:#bb86fc;">Synonyms:</strong> ${result.synonyms.join(', ')}
// //       </p>
// //       <p style="color:white; font-size:15px; font-weight:normal; font-family:sans-serif;"> 
// //         <strong style="color:#bb86fc;">Antonyms:</strong> ${result.antonyms.join(', ')}
// //       </p>
// //     `;
// //   }
// // }

// document.getElementById('search-button').addEventListener('click', searchWord);
// // document.getElementById('search-button').addEventListener('touchstart', searchWord);

// async function searchWord(event) {
//   event.preventDefault(); // Prevent default action for touch events
//   const term = document.getElementById('search-term').value;
//   const response = await fetch(`/api/word/${term}`);
//   const result = await response.json();

//   if (response.status === 404) {
//     document.getElementById('result').innerHTML = '<p>Word not found</p>';
//   } else {
//     const audioElement = result.audio ? `<audio controls><source src="${result.audio}" type="audio/mpeg">Your browser does not support the audio element.</audio>` : '<p>"No audio available."</p>';

//     document.getElementById('result').innerHTML = `
//       <h2 style="color: white; font-size: 24px;">${term}</h2>
//       <p style="color:white; font-size:15px; font-weight:normal; font-family:sans-serif;">
//         <strong style="color:#bb86fc;">Part of Speech:</strong> ${result.partOfSpeech}
//       </p>
//       <p style="color:white; font-size:15px; font-weight:normal; font-family:sans-serif;">
//         <strong style="color:#bb86fc;">Definition:</strong> ${result.definition}
//       </p>
//       <p style="color:white; font-size:15px; font-weight:normal; font-family:sans-serif;">
//         <strong style="color:#bb86fc;">Example:</strong> ${result.example}
//       </p>
//       <p style="color:white; font-size:15px; font-weight:normal; font-family:sans-serif;">
//         <strong style="color:#bb86fc;">Pronunciation:</strong> ${result.pronunciation}
//       </p>
//       ${audioElement}
//       <p style="color:white; font-size:15px; font-weight:normal; font-family:sans-serif;">
//         <strong style="color:#bb86fc;">Synonyms:</strong> ${result.synonyms.join(', ')}
//       </p>
//       <p style="color:white; font-size:15px; font-weight:normal; font-family:sans-serif;">
//         <strong style="color:#bb86fc;">Antonyms:</strong> ${result.antonyms.join(', ')}
//       </p>
//     `;
//   }
// }



document.addEventListener('DOMContentLoaded', () => {
  const searchButton = document.getElementById('search-button');
  const searchTermInput = document.getElementById('search-term');
  const resultContainer = document.getElementById('result');

  searchButton.addEventListener('click', searchWord);
  // Uncomment the following line if you want to handle touch events as well
  // searchButton.addEventListener('touchstart', searchWord);

  async function searchWord(event) {
      event.preventDefault(); // Prevent default action for touch events
      const term = searchTermInput.value;
      const response = await fetch(`/api/word/${term}`);
      const result = await response.json();

      if (response.status === 404) {
          resultContainer.innerHTML = '<p>Word not found</p>';
      } else {
          const audioElement = result.audio ? 
              `<audio controls><source src="${result.audio}" type="audio/mpeg">Your browser does not support the audio element.</audio>` : 
              '<p>No audio available.</p>';

          resultContainer.innerHTML = `
              <h2 style="color: white; font-size: 24px;">${term}</h2>
              <p style="color:white; font-size:15px; font-weight:normal; font-family:sans-serif;">
                  <strong style="color:#bb86fc;">Part of Speech:</strong> ${result.partOfSpeech}
              </p>
              <p style="color:white; font-size:15px; font-weight:normal; font-family:sans-serif;">
                  <strong style="color:#bb86fc;">Definition:</strong> ${result.definition}
              </p>
              <p style="color:white; font-size:15px; font-weight:normal; font-family:sans-serif;">
                  <strong style="color:#bb86fc;">Example:</strong> ${result.example}
              </p>
              <p style="color:white; font-size:15px; font-weight:normal; font-family:sans-serif;">
                  <strong style="color:#bb86fc;">Pronunciation:</strong> ${result.pronunciation}
              </p>
              ${audioElement}
              <p style="color:white; font-size:15px; font-weight:normal; font-family:sans-serif;">
                  <strong style="color:#bb86fc;">Synonyms:</strong> ${result.synonyms.join(', ')}
              </p>
              <p style="color:white; font-size:15px; font-weight:normal; font-family:sans-serif;">
                  <strong style="color:#bb86fc;">Antonyms:</strong> ${result.antonyms.join(', ')}
              </p>
          `;
      }
  }
});


