const PORT = 3001
const axios = require('axios');
const cheerio = require('cheerio');
const express = require('express');
const fs = require('fs');

const url = 'https://quotes.toscrape.com/'

const app = express();

axios.get(url)
    .then((response) => {
        let $ = cheerio.load(response.data);
        let quotes = [];

        $('div.col-md-8 .quote').each((index, element) => {
            quotes.push({
                title: $(element).find('span.text').text().trim(),
                author: $(element).find('small.author').text().trim(),
            })
        });

        fs.writeFile('./quotes.json', JSON.stringify(quotes), (error) => {
            if (error) throw error;
        })
    })
    .catch((error) => {
        console.log(error);
    });

app.listen(PORT, () => console.log(`server running on PORT ${PORT}...`));
