async function searchWord() {
  const term = document.getElementById('search-term').value;
  const response = await fetch(`/api/word/${term}`);
  const result = await response.json();

  if (response.status === 404) {
    document.getElementById('result').innerHTML = '<p>Word not found</p>';
  } else {
    document.getElementById('result').innerHTML = `
      <h2 style="color: white; font-size: 24px;">${term}</h2>
      <p style="color:white; font-size:15px; font-weight:normal; font-family:sans-serif;"> 
        <strong style="color:#bb86fc;">Part of Speech:</strong> ${result.partOfSpeech}
      </p>
      <p style="color:white; font-size:15px; font-weight:normal; font-family:sans-serif;"> 
        <strong style="color:#bb86fc; max-width:20%">Definition:</strong> ${result.definition}
      </p>
      <p style="color:white; font-size:15px; font-weight:normal; font-family:sans-serif;"> 
        <strong style="color:#bb86fc;">Example:</strong> ${result.example}
      </p>
      <p style="color:white; font-size:15px; font-weight:normal; font-family:sans-serif;"> 
        <strong style="color:#bb86fc;">Pronunciation:</strong> ${result.pronunciation}
      </p>
        <strong style="color:#bb86fc;">Synonyms:</strong> ${result.synonyms.join(', ')}
      </p>
      <p style="color:white; font-size:15px; font-weight:normal; font-family:sans-serif;"> 
        <strong style="color:#bb86fc;">Antonyms:</strong> ${result.antonyms.join(', ')}
      </p>
    `;
  }
}
