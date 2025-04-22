// Hinnasto
const hinnat = {
  koko: {
    pieni: 5,
    normi: 8,
    suuri: 10,
  },
  lisuke: {
    hillo: 2,
    kermavaahto: 3,
    vaahterasiirappi: 4,
  },
};

// Näyttönimet
const nimet = {
  koko: {
    pieni: "Pikkupannari",
    normi: "Normipannari",
    suuri: "Suuri pannari",
  },
  lisuke: {
    hillo: "Mansikkahillo",
    kermavaahto: "Kermavaahto",
    vaahterasiirappi: "Vaahterasiirappi",
  },
};

// Funktio hinnan laskemiseen
function laskeHinta() {
  const valittuKoko = document.querySelector(
    'input[name="koko"]:checked'
  )?.value;
  let kokonaishinta = valittuKoko ? hinnat.koko[valittuKoko] : 0;

  const lisukkeet = document.querySelectorAll('input[name="lisuke"]:checked');
  lisukkeet.forEach((lisuke) => {
    const lisukeHinta = hinnat.lisuke[lisuke.value];
    if (lisukeHinta !== undefined) {
      kokonaishinta += lisukeHinta;
    }
  });

  document.getElementById("hinta").textContent = `${kokonaishinta}€`;
  return kokonaishinta;
}

// Funktio tilausyhteenvedon näyttämiseen
function naytaTilausYhteenveto() {
  const valittuKoko = document.querySelector(
    'input[name="koko"]:checked'
  )?.value;
  const kokonaishinta = laskeHinta();

  const lisukkeet = Array.from(
    document.querySelectorAll('input[name="lisuke"]:checked')
  )
    .map((lisuke) => nimet.lisuke[lisuke.value])
    .join(", ");

  const kokoNimi = nimet.koko[valittuKoko] || "Ei kokoa valittu";
  const lisukeTeksti = lisukkeet
    ? ` lisukkeilla ${lisukkeet}`
    : " ilman lisukkeita";
  const viesti = `Tilasit: ${kokoNimi}${lisukeTeksti}, hinta ${kokonaishinta}€`;

  alert(viesti);
}

// Kuunnellaan muutoksia radiopainikkeissa ja checkboxeissa
document.querySelectorAll("input").forEach((input) => {
  input.addEventListener("change", laskeHinta);
});

// Kuunnellaan tilauspainikkeen klikkaus
document
  .getElementById("tilaa")
  .addEventListener("click", naytaTilausYhteenveto);

// Lasketaan hinta
laskeHinta();
