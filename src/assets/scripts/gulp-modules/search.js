

@@include('../libs/jquery/jquery.min.js')
@@include('../libs/pagination/pagination.min.js')
;;;;;


console.log('fefefe');
const data = new FormData();
var searchParams = new URLSearchParams(window.location.search);
data.append('ajax_data', '1');
data.append('query', searchParams.get("query"));



const jsonData = {
  query:searchParams.get("query"),
  ajax_data: 1,
}
console.log();
var myRequest = new XMLHttpRequest();
myRequest.open('POST', '/search/search_results/');
myRequest.send(data);
myRequest.onload = function() {
  console.log(`Загружено: ${myRequest.status} ${JSON.parse(myRequest.response).data}`);
  searchResultsHandling(JSON.parse(myRequest.response).data);
};


const renderTemplates = {
  'webinars': ({content, img, title}) => {
    return `
      <div class="search-item" >
        <div class="subtitle-small text-violet">${title}</div>
        ${content}
      </div>
    `;
  },
  'master-classes': ({content, img, title}) => {
    return `
      <div class="search-item" >
        <div class="subtitle-small text-violet">${title}</div>
        ${content}
      </div>
    `;
  },
  'lections': ({content, img, title}) => {
    return `
      <div class="search-item">
        <div class="subtitle-small text-violet">${title}</div>
        ${content}
      </div>
    `;
  },
  'events-anonce': ({title, content, alias, event_date_finish,  event_date_start, event_time_finish, event_time_start, location}) => (
    `<div class="white-bg-element fade-in-fwd event-item" data-event-item="" data-event-time="2021-06-14">
            <img class="event-item__img" src="/webroot/uploads/events/teddy.jpg" title="foto" alt="foto" data-pagespeed-url-hash="978528052" onload="pagespeed.CriticalImages.checkImageForCriticality(this);">
        <div class="event-item__text">
        <div class="subtitle-small text-violet">${title}</div>
        <p>${content}</p>
        <a class="button-std button-std--orange small max-content" href="/events-anonce/view/${alias}/">
          <div>Детальніше</div>
        </a>
        <div class="finish-phrase">завершено</div>
        </div>
        <div class="event-item__info-wrap">
        <div class="event-item__info-item">
          <div class="event-item__info-item-icon">
              <svg class="icon--calendar">
                  <use xlink:href="#icon-calendar"></use>
              </svg>
          </div>
          <div class="event-item__info-item-text"><b>Дата проведення:</b>
              <div>${event_date_start} – ${event_date_finish}</div>
          </div>
        </div>
        <div class="event-item__info-item">
          <div class="event-item__info-item-icon">
              <svg class="icon--clock">
                  <use xlink:href="#icon-clock"></use>
              </svg>
          </div>
          <div class="event-item__info-item-text"><b>Час проведення:</b>
              <div>${event_time_start}-${event_time_finish}</div>
          </div>
        </div>
        <div class="event-item__info-item">
          <div class="event-item__info-item-icon">
              <svg class="icon--marker">
                  <use xlink:href="#icon-marker"></use>
              </svg>
          </div>
            <div class="event-item__info-item-text"><b>Місце проведення: </b>
                <div>${location}</div>
            </div>
          </div>
        </div>
      </div>`
  ),
  'courses': ({title, content, alias, event_date_finish,  event_date_start, event_time_finish, event_time_start, location}) => (
    `<div class="white-bg-element fade-in-fwd event-item" data-event-item="" data-event-time="2021-06-14">
            <img class="event-item__img" src="/webroot/uploads/events/teddy.jpg" title="foto" alt="foto" data-pagespeed-url-hash="978528052" onload="pagespeed.CriticalImages.checkImageForCriticality(this);">
        <div class="event-item__text">
        <div class="subtitle-small text-violet">${title}</div>
        <p>${content}</p>
        <a class="button-std button-std--orange small max-content" href="/events-anonce/view/${alias}/">
          <div>Детальніше</div>
        </a>
        <div class="finish-phrase">завершено</div>
        </div>
        <div class="event-item__info-wrap">
        <div class="event-item__info-item">
          <div class="event-item__info-item-icon">
              <svg class="icon--calendar">
                  <use xlink:href="#icon-calendar"></use>
              </svg>
          </div>
          <div class="event-item__info-item-text"><b>Дата проведення:</b>
              <div>${event_date_start} – ${event_date_finish}</div>
          </div>
        </div>
        <div class="event-item__info-item">
          <div class="event-item__info-item-icon">
              <svg class="icon--clock">
                  <use xlink:href="#icon-clock"></use>
              </svg>
          </div>
          <div class="event-item__info-item-text"><b>Час проведення:</b>
              <div>${event_time_start}-${event_time_finish}</div>
          </div>
        </div>
        <div class="event-item__info-item">
          <div class="event-item__info-item-icon">
              <svg class="icon--marker">
                  <use xlink:href="#icon-marker"></use>
              </svg>
          </div>
            <div class="event-item__info-item-text"><b>Місце проведення: </b>
                <div>${location}</div>
            </div>
          </div>
        </div>
      </div>`
  ),
  'bussines-oportunities': () => {

  },
  'advices': ({alias, title}) => (
    `<a class="white-bg-element career-advice-link" href="/advices/view/${alias}/">
          <div class="subtitle-small text-violet">${title}</div>
          <div class="button-std button-std--orange small">Дивитися статтю</div>
      </a>
    `
  ),
  'additional-resourses': ({content, title}) => {
    return `
    <a class="white-bg-element resource-link fdc tdn" target="_blank" href="${content}">
        <div class="subtitle-small text-violet">${title}</div>
        <div class="button-std button-std--orange small">Перейти на сайт</div>
    </a>
      `;
  },
};

function linkSearchResult({content, img}) {
  return `
    <div class="search-item" >
      <img src="${img}">
      ${content}
    </div>
  `;
}

function additionalResourcesResult({content, title}) {
 
}
function videoSearchResult(data) {

}
function searchResultsHandling(data) {
  function singleTemplate(data) {
      return `
          <div class="search-item" >
            ${data}
          </div>
      `;
    }
    function template(data) {
      return `
          ${data.join('')}
      `;
    }
    const renderData = [];
    console.log(renderTemplates);
    data.forEach(section => {
      section.items.forEach(article => {
        renderData.push(renderTemplates[section.type](article))
        // if (article.alias !== undefined && section.type === 'courses') {
        //   renderData.push(linkSearchResult(article));
        //   console.log(article);
        // } else if (section.type === 'additional-resourses') {
        //   renderData.push(additionalResourcesResult(article))
        // }
        // else {
        //   renderData.push(singleTemplate(article.content))
        // }
      })
    })
    $('[data-pagination-container]').pagination({
      dataSource: renderData,
      pageSize: 2,
      callback: function(data, pagination) {
          // template method of yourself
          var html = template(data);
          $('[data-result-container]').html(html);
      }
    })
}

