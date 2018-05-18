//validacija
//  dohvatanje vrednosti
//  sve provere
//  ako je sve ok da onda pozove funkciju za racunanje (prosledjuju se 100% ispravni parametri)
//racunanje
//  siguaran sadm da imam validirane parametre
//  matematika ...
//  poziv funkcije za ispisivanje
//ispisivanje
// innerText


function validiraj() {
    let visina = Number(document.getElementById("visina").value);
    let masa = Number(document.getElementById("masa").value);
    let poruka;

    if (proveraUnosa() === true) {
        poruka = izracunajBMI(visina, masa);
    } else {
        poruka = "Popunite oba polja!";
        promenaKlase('');
        promenaPoruke(poruka);
    }
    
    proveraVisineIMase(visina, masa);

    return poruka;
}

function proveraUnosa() {
    let visina = document.getElementById('visina').value;
    let masa = document.getElementById('masa').value;

    if (visina.length === 0 || masa.length === 0) {
        return false;
    } else {
        return true;
    }
}

function promenaKlase(klasa) {
    let poruka = document.getElementById('rezultat');
    switch (klasa) {
        case 'neuhranjenost':
            poruka.className = 'panel panel-info';
            break;
        case 'normalno':
            poruka.className = 'panel panel-success';
            break;
        case 'gojaznost':
            poruka.className = 'panel panel-warning';
            break;
        case 'preterana_gojaznost':
            poruka.className = 'panel panel-danger';
            break;
        default:
            poruka.className = 'panel panel-primary'; //Ovo je za uopstene greske (pri pozivanju funkcije, stavljam ' ')
    }
}

function promenaPoruke(poruka, bmi, rezultat_validan) {
    let mestoZaPoruku = document.getElementById('rezultat_poruka');

    if (rezultat_validan) {
        mestoZaPoruku.innerHTML = '<div class="text-center">Vaš BMI je:<br /><h1>' + bmi.toFixed(2) + '</h1><br />' + poruka + '</div>';
    } else {
        mestoZaPoruku.innerHTML = '<div class="text-center">' + poruka + '</div>';
    }
}

function izracunajBMI(visina, masa) {
    let bmi = (masa / (visina * visina)) * 10000;
    let rezultat_validan;
    let bmi_opis = "";

    if (visina === 0 || masa === 0) {
        bmi_opis = 'Morate uneti vrednost za visinu i/ili masu veću od 0';
        promenaKlase('');
        rezultat_validan = false;
    } else {
        if (visina < 0 || masa < 0) {
            bmi_opis = 'Morate uneti pozitivne brojeve!';
            promenaKlase('');
            rezultat_validan = false;
        } else {
            if (typeof (visina) == "string" || typeof (masa) == "string") {
                bmi_opis = 'Visina i masa moraju biti broj!';
                promenaKlase('');
                rezultat_validan = false;
            } else {
                rezultat_validan = true;
                if (bmi < 18.5) {
                    bmi_opis = 'Neuhranjen/a';
                    promenaKlase('neuhranjenost');
                } else if (bmi > 18.5 && bmi < 24.9) {
                    bmi_opis = 'BMI je normalan';
                    promenaKlase('normalno');
                } else if (bmi > 25 && bmi < 29.9) {
                    bmi_opis = 'Gojaznost';
                    promenaKlase('gojaznost');
                } else if (bmi > 30) {
                    bmi_opis = 'Preterana gojaznost';
                    promenaKlase('preterana_gojaznost');
                } else {
                    bmi_opis = 'Uopštena greška: proverite ispravnost visine i/ili mase!';
                    promenaKlase('');
                    rezultat_validan = false;
                }
            }
        }
    }
    promenaPoruke(bmi_opis, bmi, rezultat_validan);


    return bmi_opis;
}


function proveraVisineIMase(visina, masa) {
    if (visina === 0 || visina < 0) {
        document.getElementById('div_visina').className = 'form-group has-error';
    } else {
        document.getElementById('div_visina').className = 'form-group has-success';
    }

    if (masa === 0 || masa < 0) {
        document.getElementById('div_masa').className = 'form-group has-error';
    } else {
        document.getElementById('div_masa').className = 'form-group has-success';
    }
}