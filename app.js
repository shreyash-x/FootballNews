const endpoint = "https://graphql.contentful.com/content/v1/spaces/od61crfdtcuy"
const query = `{
    newsCollection {
      items {
        sys {
          firstPublishedAt
        }
        name
        featuredimage {
          url
          title
          width
          height
        }
        description
      }
    }
  }`

// Here are our options to use with fetch
const fetchOptions = {
  // spaceID: "od61crfdtcuy",
  // accessToken: "Te9p9U8zaiCXNdIQodUl3gLa8fYWOxhqO4wJhykcs9o",
  method: "POST",
  headers: {
    Authorization: "Bearer Te9p9U8zaiCXNdIQodUl3gLa8fYWOxhqO4wJhykcs9o",
    "Content-Type": "application/json",
  },
  body: JSON.stringify({ query })
}

const addContentToDom = (items) => {
  items.forEach(item => {
    // Create the article element to hold all post data elements
    const articleElem = document.createElement("div");
    articleElem.className = "blog-card spring-fever";



    // Let's check if we have an image
    if (item.featuredimage) {
      // Create an image element
      const imageElem = document.createElement("img");
      // Populate with data
      imageElem.src = `${item.featuredimage.url}?w=500`;
      imageElem.alt = item.featuredimage.title;

      // Add the image element to the article element
      articleElem.appendChild(imageElem);
    }

    // Let's check if we have some text
    if (item.name) {
      // Create an h2 element
      const headlineElem = document.createElement("div");
      headlineElem.className = "title-content";
      const title = document.createElement("h3");
      // Populate with data
      title.innerText = item.name;
      headlineElem.appendChild(title);
      // Add the text element to the article element
      articleElem.appendChild(headlineElem);
    }

    if (item.description) {
      // Create an h2 element
      const textElem = document.createElement("div");
      textElem.className = "card-info";

      var converter = new showdown.Converter(),
        text = item.description,
        temp = converter.makeHtml(text);

      textElem.innerHTML = temp;
      // Add the text element to the article element
      articleElem.appendChild(textElem);
    }

    const filterElem = document.createElement("div");
    filterElem.className = "color-overlay";
    articleElem.appendChild(filterElem);

    const gradientElem = document.createElement("div");
    gradientElem.className = "gradient-overlay";
    articleElem.appendChild(gradientElem);

    // Let's append the new article element to the DOM!
    document.body.appendChild(articleElem);
  })
  // document.body.appendChild(footerElem);
}

// const headerElem = document.createElement("header");
// const footerElem = document.createElement("footer");

// headerElem.innerHTML = "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 1440 320\"><path fill=\"#DEF942\" fill-opacity=\"1\"d=\"M0,160L40,165.3C80,171,160,181,240,160C320,139,400,85,480,90.7C560,96,640,160,720,186.7C800,213,880,203,960,181.3C1040,160,1120,128,1200,133.3C1280,139,1360,181,1400,202.7L1440,224L1440,0L1400,0C1360,0,1280,0,1200,0C1120,0,1040,0,960,0C880,0,800,0,720,0C640,0,560,0,480,0C400,0,320,0,240,0C160,0,80,0,40,0L0,0Z\"></path></svg>"
// footerElem.innerHTML = "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 1440 320\"><path fill=\"#DEF942\" fill-opacity=\"1\"d=\"M0,160L40,165.3C80,171,160,181,240,160C320,139,400,85,480,90.7C560,96,640,160,720,186.7C800,213,880,203,960,181.3C1040,160,1120,128,1200,133.3C1280,139,1360,181,1400,202.7L1440,224L1440,320L1400,320C1360,320,1280,320,1200,320C1120,320,1040,320,960,320C880,320,800,320,720,320C640,320,560,320,480,320C400,320,320,320,240,320C160,320,80,320,40,320L0,320Z\"></path></svg>"

// document.body.appendChild(headerElem);
// Let's fetch the data - check out the browser console!
fetch(endpoint, fetchOptions)
  .then(response => response.json())
  .then(data => addContentToDom(data.data.newsCollection.items));

document.body.style.margin = "0";