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
    <a href="https://www.youtube.com/watch?v=dQw4w9WgXcQ">View Demo</a>
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
        <li><a href="#running-locally">Running locally</a></li>
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
- <a href="https://ollama.com/">Ollama</a> service running

## Running locally
0. Consider seeing <a href="https://www.youtube.com/watch?v=dQw4w9WgXcQ">this demo</a> to understand normal results
1. Run the code below:

```bash
# "Read the source, Luke"
git clone https://github.com/axelcarapinha/ISToResumido.git && \
cd ISToResumido && \
sudo bash init.sh
```

2. Visit <a href="http://localhost:3000">your local interface</a>


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


---

# About The Project
<a href="https://en.wikipedia.org/wiki/Retrieval-augmented_generation">RAG</a> with data scraped from <a>Instituto Superior Técnico</a>. <br/>
"What advantages does it bring?" Check them <a href="https://istoresumido.axelamc.com">here</a>.
<br/>
It can (relatively quickly) be adapted to other use cases. A tutorial on that is already a task to do.<br/>


## Built With
            
| Tool           | Usage                                                               |
|----------------|---------------------------------------------------------            |
| [![Scrapy][Scrapy]][Scrapy-url]  | Scraping data from IST                            |
| [![Flask][Flask]][Flask-url]      | Backend API                                      |
| [![Python][Python]][Python-url]   | Core programming language for the project        |
| [![ChromaDB][ChromaDB]][ChromaDB-url] | Database for storing and managing embeddings |
| [![React][React]][React-url]      | Frontend web interface                           |
| [![Canva][Canva]][Canva-url]      | To make the Logo and some icon designs           |
| [![Docker][Docker]][Docker-url]   | Containerization                                 |


## Q and A
I did not make a chatbot for this questions XD

- Why scrape data?
  - Why not?
  - Being frank, IST does have an API, but it does not allow to download files (afaik), so I simulated a user on 7 cups of coffee downloading, by adding some intentional overhead to the download process.
  - Also, it only downloads once, Scrapy avoids repetitive downloads.
- What content does it scrape?
  - Currently only PDFs
- What is the main flow of requests?
  1. User
  2. Browser
  3. React
  4. API (a single route exposed, with traffic limit, difficulting DoS hehe)
  5. Python backend
  6. LLM running (managed by Ollama)
  7. All the way back with the response
- What model should I use?
  - There can actually be 3 models being used (open models go brrrr):
    1. one for the embeddings
    2. other for the actual prompts
    3. a final one for evaluating the prompts of the previous (<a href="https://humornama.com/wp-content/uploads/2021/01/Obama-Awarding-Obama-meme-template.jpg">like this</a>)
  - Llama2 should already give reasonable results for the quality of embeddings (that only need to run when adding new documents)
  - For the LLM using the embeddings, it needs to be tested, I'm even considering the possibility of using ChatGPT (depending on the quota)
- How can it be publicly deployed?
  - Kubernetes remains a good plan for me, but I accept other alternatives

## License
==TODO==
Include the LICENSE.TXT and other needed files

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

[Docker]: https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white
[Docker-url]: https://www.docker.com/

[React]: https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB
[React-url]: https://react.dev/