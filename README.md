<a id="readme-top"></a>

<!-- PROJECT LOGO -->
<br />
<div align="center">
  <a href="https://github.com/axelcarapinha/ISToResumido">
    <img src="00_resources/logo_rounded.png" alt="Logo" width="200" height="200">
  </a>

<h3 align="center">ISToresumido</h3>
  <p align="center">
    LLM tailored to <a href="https://tecnico.ulisboa.pt/en/">IST</a>
    <br />
    <a href="https://istoresumido.axelamc.com"><strong>Check it out »</strong></a>
    <br />
    <br />
    <a href="https://youtu.be/ow49a4tRq6Q">View Demo</a>
    &middot;
    <a href="https://github.com/axelcarapinha/ISToResumido/issues/new">Report Bug / Feature Requests</a>
  </p>
</div>

<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#how-to-deploy">How to deploy</a></li>
        <li><a href="#contributions">Contributions</a></li>
      </ul>
    </li>
    <li>
      <a href="#about-the-project">About The Project!</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
        <li><a href="#q-and-a">Q and A</a></li>
        <li><a href="#license">License</a></li>
        <li><a href="#acknowledgments">Acknowledgments</a></li>
      </ul>
    </li>
  </ol>
</details>

---
# Getting Started!

## Prerequisites
- <a href="https://docs.docker.com/compose/install/">Docker Compose</a>

## How to deploy
Video <a href="https://youtu.be/ow49a4tRq6Q">tutorial</a>, or:
1. Clone the repo

```bash
git clone https://github.com/axelcarapinha/ISToResumido.git && cd ISToResumido
```

2. Edit the docker-compose.yml file, changing to your needs the values of the following parts:
- network (default works for localhost)
- NEXT_PUBLIC_API_URL (the URL for the _backend_ API, defaults to http://localhost:5000)
- CORS_ALLOWED_URL (the URL that points to the _frontend_, defaults to http://localhost:3000)

3. Create the file with your openai api key (or configure to run with ollama)
```bash
# Make sure .gitignore should already have "openai_api_key.txt" on it!
nano openai_api_key.txt # paste your api key there, and save
```

4. Edit the `init.sh` file if you want to scrape data first

5. Let docker compose, get up and build something useful.
```bash
# "Read the source, Luke"
bash init.sh
```

6. Visit your <a href="http://localhost:3000">local interface</a> (if you runned it locally)

## Contributions
There's a lot of room for improvements!

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request


## But what do I contribute with?
- Ideas of your own
- Features and issues from the [GitHub project](https://github.com/users/axelcarapinha/projects/11)

## I want to learn in order to contribute. What do I need to know?
At first, Docker. I learned from [tutorials](https://www.youtube.com/watch?v=dH3DdLy574M&list=PLIhvC56v63IJlnU4k60d0oFIrsbXEivQo) and good [documentation](https://docs.docker.com/), for example.

Then, learning about [APIs](https://www.youtube.com/watch?v=4vLxWqE94l4). <br/>
Possible <u>sidequest</u>: understanding why ISToResumido's API is _not_ a [fully compliant RESTful API](https://roy.gbiv.com/untangled/2008/rest-apis-must-be-hypertext-driven).

From now on, it depends on where you want to focus:

**Frontend:**
  - React
  - JavaScript (JS)

**Crawler:**
  - Python
  - Web scrapers
  - Headless browsers (at least an overview)
  - XPath

**Backend:**
  - Python
  - Vector databases (at least an overview)
  - Retrieval-Augmented Generation (at least an overview)

Also, useful to learn, is Git. Hey, consider using [this](https://learngitbranching.js.org/).

---

# About The Project
<a href="https://en.wikipedia.org/wiki/Retrieval-augmented_generation">RAG</a> with data scraped from <a>Instituto Superior Técnico</a>. <br/>
"What advantages does it bring?" Check them <a href="https://istoresumido.axelamc.com">here</a>.
<br/>
It can (relatively quickly) be adapted to other use cases. A tutorial on that is already a task to do.<br/>


## Built With

| Tool           | Usage                                                               |
|----------------|---------------------------------------------------------------------|
| [![React][React]][React-url]      | Frontend web interface                           |
| [![Gunicorn][Gunicorn]][Gunicorn-url] | WSGI server for running the Flask API (improves performance) |
| [![Flask][Flask]][Flask-url]      | Backend API                                      |
| [![Python][Python]][Python-url]   | Core programming language for the project        |
| [![Redis][Redis]][Redis-url]      | In-memory data store for caching and message brokering |
| [![ChromaDB][ChromaDB]][ChromaDB-url] | Database for storing and managing embeddings |
| [![Docker][Docker]][Docker-url]   | Containerization 
| [![Scrapy][Scrapy]][Scrapy-url]  | Scraping data from IST                            |
| [![Canva][Canva]][Canva-url]      | To make the Logo and some icon designs           |



## Q and A
I did not make a chatbot for this questions XD

- Where is the website hosted?
  - "Intermitent" RaspBerryPi server with 8Gib of RAM (sometimes it will be turned off, need another hosting method, probably).
- Why scrape data?
  - Why not?
  - Being frank, IST does have an API, but it does not allow to download files (afaik), so I simulated a user on 7 cups of coffee downloading, by adding some intentional overhead to the download process.
  - Also, it only downloads once, Scrapy avoids repetitive downloads.
- What content does it scrape?
  - Currently only PDFs (it has a bash script that filters out image-only PDFs, as that ones will need OCR in a future feature).
- What is the main flow of requests?
  1. User
  2. Browser
  3. React
  4. API (a single route exposed, with traffic limit and proxied through Cloudflare)
  5. Python backend
  6. LLM running (currently with an OpenAI (paid) API key)
  7. All the way back with the response
- What model should I use?
  - There can actually be 3 models being used (open models go brrrr):
    1. one for the embeddings
    2. other for the actual prompts
    3. a final one for evaluating the prompts of the previous (<a href="https://humornama.com/wp-content/uploads/2021/01/Obama-Awarding-Obama-meme-template.jpg">like this</a>)
  - Currently uses OpenAI API
  - Llama2 should already give reasonable results for the quality of embeddings (that only need to run when adding new documents)
  - For the LLM using the embeddings, it needs to be tested
- How can it be publicly deployed?
  - Kubernetes remains a good plan for in the future, but with Docker Compose from a single system _currently_ runs well
- I think you did wrong choices, can the project change?
  - Sure! Let me know your perspectives, change and contribute :) it's open source after all

## Acknowledgments
- The <a href="./backend//RAGeneration/">RAGeneration</a> code is highly inspired by [this tutorial](https://www.youtube.com/watch?v=2TJxpyO3ei4), being later adapted to the remaining parts I've been adding.
- The frontend was adapted from an initial draft made with <a href="https://v0.dev/">V0</a>


[Scrapy]: https://img.shields.io/badge/Scrapy-00B140?style=for-the-badge&logo=scrapy&logoColor=white
[Scrapy-url]: https://scrapy.org/

[Canva]: https://img.shields.io/badge/Canva-00C4CC?style=for-the-badge&logo=canva&logoColor=white
[Canva-url]: https://www.canva.com/

[Flask]: https://img.shields.io/badge/Flask-000000?style=for-the-badge&logo=flask&logoColor=white
[Flask-url]: https://flask.palletsprojects.com/en/stable/

[Python]: https://img.shields.io/badge/Python-3776AB?style=for-the-badge&logo=python&logoColor=white
[Python-url]: https://www.python.org/

[ChromaDB]: https://img.shields.io/badge/ChromaDB-FF6B6B?style=for-the-badge&logo=database&logoColor=white
[ChromaDB-url]: https://www.trychroma.com/

[Gunicorn]: https://img.shields.io/badge/Gunicorn-5A5A5A?style=for-the-badge&logo=gunicorn&logoColor=white
[Gunicorn-url]: https://gunicorn.org/

[Redis]: https://img.shields.io/badge/Redis-DC382D?style=for-the-badge&logo=redis&logoColor=white
[Redis-url]: https://redis.io/

[Docker]: https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white
[Docker-url]: https://www.docker.com/

[React]: https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB
[React-url]: https://react.dev/
