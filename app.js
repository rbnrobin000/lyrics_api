document.getElementById('search_button').addEventListener('click', () => {
    getSongDetails();
})
const display = document.getElementById('search-result');

function getSongDetails() {
    const searchText = document.getElementById('search_text').value;
    const url = `https://api.lyrics.ovh/suggest/${searchText}`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
        display.innerHTML = '';
        for (let i = 0; i < data.data.length; i++) {
            const song = data.data[i];
                songDisplay(song);
            }
        })
    
    display.style.display = 'block';
}

function songDisplay(song) {
    const searchResult = document.getElementById('search-result');

    const createDiv = document.createElement('div');
    createDiv.innerHTML = `
    <div class="single-result row align-items-center my-3 p-3">
        <div class="col-md-9">
            <h3 class="lyrics-name">${song.title}</h3>
            <p class="author lead">Album Name: <span>${song.album.title}</span></p>
            <p class="author lead">Album by <span>'${song.artist.name}'</span></p>
            <audio controls>
                <source src=${song.preview} type="audio/ogg">
            </audio>
        </div>
        <div class="col-md-3 text-md-right text-center">
            <a class="btn btn-success" href="${song.link}" target="_blank">Get Lyrics</a>
        </div>
    </div>
    `;
    searchResult.appendChild(createDiv);
}