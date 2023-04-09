import React, { useContext, useState } from "react";
import Navbar from "../components/Navbar";
import { useForm } from "react-hook-form";
import signUpEmployer from "../utils/signUpEmployer";
import { EmployerDispatchContext } from "../contexts/EmployerContext";

const services = ["plombier", "comptable", "tapicier", "Electricien", "autre"];
// locations
const cities = [
  {
    id: "0",
    ville: "Afourar",
    region: "5",
  },
  {
    id: "1",
    ville: "Agadir",
    region: "9",
  },
  {
    id: "2",
    ville: "Agdz",
    region: "8",
  },
  {
    id: "3",
    ville: "Aghbala",
    region: "5",
  },
  {
    id: "4",
    ville: "Agni Izimmer",
    region: "9",
  },
  {
    id: "5",
    ville: "Agourai",
    region: "3",
  },
  {
    id: "6",
    ville: "Ahfir",
    region: "2",
  },
  {
    id: "7",
    ville: "Ain El Aouda",
    region: "4",
  },
  {
    id: "8",
    ville: "Ain Taoujdate",
    region: "3",
  },
  {
    id: "9",
    ville: "Ait Daoud",
    region: "7",
  },
  {
    id: "10",
    ville: "Ajdir‎",
    region: "1",
  },
  {
    id: "11",
    ville: "Akchour",
    region: "1",
  },
  {
    id: "12",
    ville: "Akka",
    region: "9",
  },
  {
    id: "13",
    ville: "Aklim",
    region: "2",
  },
  {
    id: "14",
    ville: "Aknoul‎",
    region: "3",
  },
  {
    id: "15",
    ville: "Al Aroui",
    region: "2",
  },
  {
    id: "16",
    ville: "Al Hoceïma‎",
    region: "1",
  },
  {
    id: "17",
    ville: "Alnif",
    region: "8",
  },
  {
    id: "18",
    ville: "Amalou Ighriben",
    region: "5",
  },
  {
    id: "19",
    ville: "Amizmiz",
    region: "7",
  },
  {
    id: "20",
    ville: "Anzi",
    region: "9",
  },
  {
    id: "21",
    ville: "Aoufous",
    region: "8",
  },
  {
    id: "22",
    ville: "Aoulouz",
    region: "9",
  },
  {
    id: "23",
    ville: "Aourir",
    region: "9",
  },
  {
    id: "24",
    ville: "Arazane",
    region: "9",
  },
  {
    id: "25",
    ville: "Arbaoua",
    region: "4",
  },
  {
    id: "26",
    ville: "Arfoud",
    region: "8",
  },
  {
    id: "27",
    ville: "Assa",
    region: "10",
  },
  {
    id: "28",
    ville: "Assahrij",
    region: "7",
  },
  {
    id: "29",
    ville: "Assilah",
    region: "1",
  },
  {
    id: "30",
    ville: "Awsard",
    region: "12",
  },
  {
    id: "31",
    ville: "Azemmour",
    region: "6",
  },
  {
    id: "32",
    ville: "Azilal",
    region: "5",
  },
  {
    id: "33",
    ville: "Azrou",
    region: "3",
  },
  {
    id: "34",
    ville: "Aïn Bni Mathar",
    region: "2",
  },
  {
    id: "35",
    ville: "Aïn Cheggag",
    region: "3",
  },
  {
    id: "36",
    ville: "Aïn Dorij",
    region: "1",
  },
  {
    id: "37",
    ville: "Aïn Erreggada",
    region: "2",
  },
  {
    id: "38",
    ville: "Aïn Harrouda",
    region: "6",
  },
  {
    id: "39",
    ville: "Aïn Jemaa",
    region: "3",
  },
  {
    id: "40",
    ville: "Aïn Karma",
    region: "3",
  },
  {
    id: "41",
    ville: "Aïn Leuh",
    region: "3",
  },
  {
    id: "42",
    ville: "Aït Attab",
    region: "5",
  },
  {
    id: "43",
    ville: "Aït Baha",
    region: "9",
  },
  {
    id: "44",
    ville: "Aït Boubidmane",
    region: "3",
  },
  {
    id: "45",
    ville: "Aït Hichem‎",
    region: "1",
  },
  {
    id: "46",
    ville: "Aït Iaâza",
    region: "9",
  },
  {
    id: "47",
    ville: "Aït Ishaq",
    region: "5",
  },
  {
    id: "48",
    ville: "Aït Majden",
    region: "5",
  },
  {
    id: "49",
    ville: "Aït Melloul",
    region: "9",
  },
  {
    id: "50",
    ville: "Aït Ourir",
    region: "7",
  },
  {
    id: "51",
    ville: "Aït Yalla",
    region: "8",
  },
  {
    id: "52",
    ville: "Bab Berred",
    region: "1",
  },
  {
    id: "53",
    ville: "Bab Taza",
    region: "1",
  },
  {
    id: "54",
    ville: "Bejaâd",
    region: "5",
  },
  {
    id: "55",
    ville: "Ben Ahmed",
    region: "6",
  },
  {
    id: "56",
    ville: "Ben Guerir",
    region: "7",
  },
  {
    id: "57",
    ville: "Ben Sergao",
    region: "9",
  },
  {
    id: "58",
    ville: "Ben Taïeb",
    region: "2",
  },
  {
    id: "59",
    ville: "Ben Yakhlef",
    region: "6",
  },
  {
    id: "60",
    ville: "Beni Ayat",
    region: "5",
  },
  {
    id: "61",
    ville: "Benslimane",
    region: "6",
  },
  {
    id: "62",
    ville: "Berkane",
    region: "2",
  },
  {
    id: "63",
    ville: "Berrechid",
    region: "6",
  },
  {
    id: "64",
    ville: "Bhalil",
    region: "3",
  },
  {
    id: "65",
    ville: "Bin elouidane",
    region: "5",
  },
  {
    id: "66",
    ville: "Biougra",
    region: "9",
  },
  {
    id: "67",
    ville: "Bir Jdid",
    region: "6",
  },
  {
    id: "68",
    ville: "Bni Ansar",
    region: "2",
  },
  {
    id: "69",
    ville: "Bni Bouayach‎",
    region: "1",
  },
  {
    id: "70",
    ville: "Bni Chiker",
    region: "2",
  },
  {
    id: "71",
    ville: "Bni Drar",
    region: "2",
  },
  {
    id: "72",
    ville: "Bni Hadifa‎",
    region: "1",
  },
  {
    id: "73",
    ville: "Bni Tadjite",
    region: "2",
  },
  {
    id: "74",
    ville: "Bouanane",
    region: "2",
  },
  {
    id: "75",
    ville: "Bouarfa",
    region: "2",
  },
  {
    id: "76",
    ville: "Boudnib",
    region: "8",
  },
  {
    id: "77",
    ville: "Boufakrane",
    region: "3",
  },
  {
    id: "78",
    ville: "Bouguedra",
    region: "7",
  },
  {
    id: "79",
    ville: "Bouhdila",
    region: "2",
  },
  {
    id: "80",
    ville: "Bouizakarne",
    region: "10",
  },
  {
    id: "81",
    ville: "Boujdour‎",
    region: "11",
  },
  {
    id: "82",
    ville: "Boujniba",
    region: "5",
  },
  {
    id: "83",
    ville: "Boulanouare",
    region: "5",
  },
  {
    id: "84",
    ville: "Boulemane",
    region: "3",
  },
  {
    id: "85",
    ville: "Boumalne-Dadès",
    region: "8",
  },
  {
    id: "86",
    ville: "Boumia",
    region: "8",
  },
  {
    id: "87",
    ville: "Bouskoura",
    region: "6",
  },
  {
    id: "88",
    ville: "Bouznika",
    region: "6",
  },
  {
    id: "89",
    ville: "Bradia",
    region: "5",
  },
  {
    id: "90",
    ville: "Brikcha",
    region: "1",
  },
  {
    id: "91",
    ville: "Bzou",
    region: "5",
  },
  {
    id: "92",
    ville: "Béni Mellal",
    region: "5",
  },
  {
    id: "93",
    ville: "Casablanca",
    region: "6",
  },
  {
    id: "94",
    ville: "Chefchaouen",
    region: "1",
  },
  {
    id: "95",
    ville: "Chichaoua",
    region: "7",
  },
  {
    id: "96",
    ville: "Dar Bni Karrich",
    region: "1",
  },
  {
    id: "97",
    ville: "Dar Chaoui",
    region: "1",
  },
  {
    id: "98",
    ville: "Dar El Kebdani",
    region: "2",
  },
  {
    id: "99",
    ville: "Dar Gueddari",
    region: "4",
  },
  {
    id: "100",
    ville: "Dar Oulad Zidouh",
    region: "5",
  },
  {
    id: "101",
    ville: "Dcheira El Jihadia",
    region: "9",
  },
  {
    id: "102",
    ville: "Debdou",
    region: "2",
  },
  {
    id: "103",
    ville: "Demnate",
    region: "5",
  },
  {
    id: "104",
    ville: "Deroua",
    region: "6",
  },
  {
    id: "105",
    ville: "Douar Kannine",
    region: "2",
  },
  {
    id: "106",
    ville: "Dra'a",
    region: "8",
  },
  {
    id: "107",
    ville: "Drargua",
    region: "9",
  },
  {
    id: "108",
    ville: "Driouch",
    region: "2",
  },
  {
    id: "109",
    ville: "Echemmaia",
    region: "7",
  },
  {
    id: "110",
    ville: "El Aïoun Sidi Mellouk",
    region: "2",
  },
  {
    id: "111",
    ville: "El Borouj",
    region: "6",
  },
  {
    id: "112",
    ville: "El Gara",
    region: "6",
  },
  {
    id: "113",
    ville: "El Guerdane",
    region: "9",
  },
  {
    id: "114",
    ville: "El Hajeb",
    region: "3",
  },
  {
    id: "115",
    ville: "El Hanchane",
    region: "7",
  },
  {
    id: "116",
    ville: "El Jadida",
    region: "6",
  },
  {
    id: "117",
    ville: "El Kelaâ des Sraghna",
    region: "7",
  },
  {
    id: "118",
    ville: "El Ksiba",
    region: "5",
  },
  {
    id: "119",
    ville: "El Marsa‎",
    region: "11",
  },
  {
    id: "120",
    ville: "El Menzel",
    region: "3",
  },
  {
    id: "121",
    ville: "El Ouatia",
    region: "10",
  },
  {
    id: "122",
    ville: "Elkbab",
    region: "5",
  },
  {
    id: "123",
    ville: "Er-Rich",
    region: "5",
  },
  {
    id: "124",
    ville: "Errachidia",
    region: "8",
  },
  {
    id: "125",
    ville: "Es-Semara",
    region: "11",
  },
  {
    id: "126",
    ville: "Essaouira",
    region: "7",
  },
  {
    id: "127",
    ville: "Fam El Hisn",
    region: "9",
  },
  {
    id: "128",
    ville: "Farkhana",
    region: "2",
  },
  {
    id: "129",
    ville: "Figuig",
    region: "2",
  },
  {
    id: "130",
    ville: "Fnideq",
    region: "1",
  },
  {
    id: "131",
    ville: "Foum Jamaa",
    region: "5",
  },
  {
    id: "132",
    ville: "Foum Zguid",
    region: "9",
  },
  {
    id: "133",
    ville: "Fquih Ben Salah",
    region: "5",
  },
  {
    id: "134",
    ville: "Fraïta",
    region: "7",
  },
  {
    id: "135",
    ville: "Fès",
    region: "3",
  },
  {
    id: "136",
    ville: "Gardmit",
    region: "8",
  },
  {
    id: "137",
    ville: "Ghafsai‎",
    region: "3",
  },
  {
    id: "138",
    ville: "Ghmate",
    region: "7",
  },
  {
    id: "139",
    ville: "Goulmima",
    region: "8",
  },
  {
    id: "140",
    ville: "Gourrama",
    region: "8",
  },
  {
    id: "141",
    ville: "Guelmim",
    region: "10",
  },
  {
    id: "142",
    ville: "Guercif‎",
    region: "2",
  },
  {
    id: "143",
    ville: "Gueznaia",
    region: "1",
  },
  {
    id: "144",
    ville: "Guigou",
    region: "3",
  },
  {
    id: "145",
    ville: "Guisser",
    region: "6",
  },
  {
    id: "146",
    ville: "Had Bouhssoussen",
    region: "5",
  },
  {
    id: "147",
    ville: "Had Kourt",
    region: "4",
  },
  {
    id: "148",
    ville: "Haj Kaddour",
    region: "3",
  },
  {
    id: "149",
    ville: "Harhoura",
    region: "4",
  },
  {
    id: "150",
    ville: "Harte Lyamine",
    region: "8",
  },
  {
    id: "151",
    ville: "Hattane",
    region: "5",
  },
  {
    id: "152",
    ville: "Hrara",
    region: "7",
  },
  {
    id: "153",
    ville: "Ida Ougnidif",
    region: "9",
  },
  {
    id: "154",
    ville: "Ifrane",
    region: "3",
  },
  {
    id: "155",
    ville: "Ifri",
    region: "8",
  },
  {
    id: "156",
    ville: "Igdamen",
    region: "9",
  },
  {
    id: "157",
    ville: "Ighil n'Oumgoun",
    region: "8",
  },
  {
    id: "158",
    ville: "Ighoud",
    region: "7",
  },
  {
    id: "159",
    ville: "Ighounane",
    region: "8",
  },
  {
    id: "160",
    ville: "Ihddaden",
    region: "2",
  },
  {
    id: "161",
    ville: "Imassine",
    region: "8",
  },
  {
    id: "162",
    ville: "Imintanoute",
    region: "7",
  },
  {
    id: "163",
    ville: "Imouzzer Kandar",
    region: "3",
  },
  {
    id: "164",
    ville: "Imouzzer Marmoucha",
    region: "3",
  },
  {
    id: "165",
    ville: "Imzouren‎",
    region: "1",
  },
  {
    id: "166",
    ville: "Inahnahen‎",
    region: "1",
  },
  {
    id: "167",
    ville: "Inezgane",
    region: "9",
  },
  {
    id: "168",
    ville: "Irherm",
    region: "9",
  },
  {
    id: "169",
    ville: "Issaguen (Ketama)‎",
    region: "1",
  },
  {
    id: "170",
    ville: "Itzer",
    region: "8",
  },
  {
    id: "171",
    ville: "Jamâat Shaim",
    region: "7",
  },
  {
    id: "172",
    ville: "Jaâdar",
    region: "2",
  },
  {
    id: "173",
    ville: "Jebha",
    region: "1",
  },
  {
    id: "174",
    ville: "Jerada",
    region: "2",
  },
  {
    id: "175",
    ville: "Jorf",
    region: "8",
  },
  {
    id: "176",
    ville: "Jorf El Melha",
    region: "4",
  },
  {
    id: "177",
    ville: "Jorf Lasfar",
    region: "6",
  },
  {
    id: "178",
    ville: "Karia",
    region: "3",
  },
  {
    id: "179",
    ville: "Karia (El Jadida)‎",
    region: "6",
  },
  {
    id: "180",
    ville: "Karia Ba Mohamed‎",
    region: "3",
  },
  {
    id: "181",
    ville: "Kariat Arekmane",
    region: "2",
  },
  {
    id: "182",
    ville: "Kasba Tadla",
    region: "5",
  },
  {
    id: "183",
    ville: "Kassita",
    region: "2",
  },
  {
    id: "184",
    ville: "Kattara",
    region: "7",
  },
  {
    id: "185",
    ville: "Kehf Nsour",
    region: "5",
  },
  {
    id: "186",
    ville: "Kelaat-M'Gouna",
    region: "8",
  },
  {
    id: "187",
    ville: "Kerouna",
    region: "2",
  },
  {
    id: "188",
    ville: "Kerrouchen",
    region: "5",
  },
  {
    id: "189",
    ville: "Khemis Zemamra",
    region: "6",
  },
  {
    id: "190",
    ville: "Khenichet",
    region: "4",
  },
  {
    id: "191",
    ville: "Khouribga",
    region: "5",
  },
  {
    id: "192",
    ville: "Khémis Sahel",
    region: "1",
  },
  {
    id: "193",
    ville: "Khémisset",
    region: "4",
  },
  {
    id: "194",
    ville: "Khénifra",
    region: "5",
  },
  {
    id: "195",
    ville: "Ksar El Kébir",
    region: "1",
  },
  {
    id: "196",
    ville: "Kénitra",
    region: "4",
  },
  {
    id: "197",
    ville: "Laaounate",
    region: "6",
  },
  {
    id: "198",
    ville: "Laayoune‎",
    region: "11",
  },
  {
    id: "199",
    ville: "Lakhsas",
    region: "9",
  },
  {
    id: "200",
    ville: "Lakhsass",
    region: "9",
  },
  {
    id: "201",
    ville: "Lalla Mimouna",
    region: "4",
  },
  {
    id: "202",
    ville: "Lalla Takerkoust",
    region: "7",
  },
  {
    id: "203",
    ville: "Larache",
    region: "1",
  },
  {
    id: "204",
    ville: "Laâtamna",
    region: "2",
  },
  {
    id: "205",
    ville: "Loudaya",
    region: "7",
  },
  {
    id: "206",
    ville: "Loulad",
    region: "6",
  },
  {
    id: "207",
    ville: "Lqliâa",
    region: "9",
  },
  {
    id: "208",
    ville: "Lâattaouia",
    region: "7",
  },
  {
    id: "209",
    ville: "M'diq",
    region: "1",
  },
  {
    id: "210",
    ville: "M'haya",
    region: "3",
  },
  {
    id: "211",
    ville: "M'rirt",
    region: "5",
  },
  {
    id: "212",
    ville: "M'semrir",
    region: "8",
  },
  {
    id: "213",
    ville: "Madagh",
    region: "2",
  },
  {
    id: "214",
    ville: "Marrakech",
    region: "7",
  },
  {
    id: "215",
    ville: "Martil",
    region: "1",
  },
  {
    id: "216",
    ville: "Massa (Maroc)",
    region: "9",
  },
  {
    id: "217",
    ville: "Mechra Bel Ksiri",
    region: "4",
  },
  {
    id: "218",
    ville: "Megousse",
    region: "9",
  },
  {
    id: "219",
    ville: "Mehdia",
    region: "4",
  },
  {
    id: "220",
    ville: "Meknès‎",
    region: "3",
  },
  {
    id: "221",
    ville: "Midar",
    region: "2",
  },
  {
    id: "222",
    ville: "Midelt",
    region: "8",
  },
  {
    id: "223",
    ville: "Missour",
    region: "3",
  },
  {
    id: "224",
    ville: "Mohammadia",
    region: "6",
  },
  {
    id: "225",
    ville: "Moqrisset",
    region: "1",
  },
  {
    id: "226",
    ville: "Moulay Abdallah",
    region: "6",
  },
  {
    id: "227",
    ville: "Moulay Ali Cherif",
    region: "8",
  },
  {
    id: "228",
    ville: "Moulay Bouazza",
    region: "5",
  },
  {
    id: "229",
    ville: "Moulay Bousselham",
    region: "4",
  },
  {
    id: "230",
    ville: "Moulay Brahim",
    region: "7",
  },
  {
    id: "231",
    ville: "Moulay Idriss Zerhoun",
    region: "3",
  },
  {
    id: "232",
    ville: "Moulay Yaâcoub",
    region: "3",
  },
  {
    id: "233",
    ville: "Moussaoua",
    region: "3",
  },
  {
    id: "234",
    ville: "MyAliCherif",
    region: "8",
  },
  {
    id: "235",
    ville: "Mzouda",
    region: "7",
  },
  {
    id: "236",
    ville: "Médiouna",
    region: "6",
  },
  {
    id: "237",
    ville: "N'Zalat Bni Amar",
    region: "3",
  },
  {
    id: "238",
    ville: "Nador",
    region: "2",
  },
  {
    id: "239",
    ville: "Naima",
    region: "2",
  },
  {
    id: "240",
    ville: "Oualidia",
    region: "6",
  },
  {
    id: "241",
    ville: "Ouaouizeght",
    region: "5",
  },
  {
    id: "242",
    ville: "Ouaoumana",
    region: "5",
  },
  {
    id: "243",
    ville: "Ouarzazate",
    region: "8",
  },
  {
    id: "244",
    ville: "Ouazzane",
    region: "1",
  },
  {
    id: "245",
    ville: "Oued Amlil‎",
    region: "3",
  },
  {
    id: "246",
    ville: "Oued Heimer",
    region: "2",
  },
  {
    id: "247",
    ville: "Oued Ifrane",
    region: "3",
  },
  {
    id: "248",
    ville: "Oued Laou",
    region: "1",
  },
  {
    id: "249",
    ville: "Oued Rmel",
    region: "1",
  },
  {
    id: "250",
    ville: "Oued Zem",
    region: "5",
  },
  {
    id: "251",
    ville: "Oued-Eddahab",
    region: "12",
  },
  {
    id: "252",
    ville: "Oujda",
    region: "2",
  },
  {
    id: "253",
    ville: "Oulad Abbou",
    region: "6",
  },
  {
    id: "254",
    ville: "Oulad Amrane",
    region: "6",
  },
  {
    id: "255",
    ville: "Oulad Ayad",
    region: "5",
  },
  {
    id: "256",
    ville: "Oulad Berhil",
    region: "9",
  },
  {
    id: "257",
    ville: "Oulad Frej",
    region: "6",
  },
  {
    id: "258",
    ville: "Oulad Ghadbane",
    region: "6",
  },
  {
    id: "259",
    ville: "Oulad H'Riz Sahel",
    region: "6",
  },
  {
    id: "260",
    ville: "Oulad M'Barek",
    region: "5",
  },
  {
    id: "261",
    ville: "Oulad M'rah",
    region: "6",
  },
  {
    id: "262",
    ville: "Oulad Saïd",
    region: "6",
  },
  {
    id: "263",
    ville: "Oulad Sidi Ben Daoud",
    region: "6",
  },
  {
    id: "264",
    ville: "Oulad Teïma",
    region: "9",
  },
  {
    id: "265",
    ville: "Oulad Yaich",
    region: "5",
  },
  {
    id: "266",
    ville: "Oulad Zbair‎",
    region: "3",
  },
  {
    id: "267",
    ville: "Ouled Tayeb",
    region: "3",
  },
  {
    id: "268",
    ville: "Oulmès",
    region: "4",
  },
  {
    id: "269",
    ville: "Ounagha",
    region: "7",
  },
  {
    id: "270",
    ville: "Outat El Haj",
    region: "3",
  },
  {
    id: "271",
    ville: "Point Cires",
    region: "1",
  },
  {
    id: "272",
    ville: "Rabat",
    region: "4",
  },
  {
    id: "273",
    ville: "Ras El Aïn",
    region: "6",
  },
  {
    id: "274",
    ville: "Ras El Ma",
    region: "2",
  },
  {
    id: "275",
    ville: "Ribate El Kheir",
    region: "3",
  },
  {
    id: "276",
    ville: "Rissani",
    region: "8",
  },
  {
    id: "277",
    ville: "Rommani",
    region: "4",
  },
  {
    id: "278",
    ville: "Sabaa Aiyoun",
    region: "3",
  },
  {
    id: "279",
    ville: "Safi",
    region: "7",
  },
  {
    id: "280",
    ville: "Salé",
    region: "4",
  },
  {
    id: "281",
    ville: "Sarghine",
    region: "8",
  },
  {
    id: "282",
    ville: "Saïdia",
    region: "2",
  },
  {
    id: "283",
    ville: "Sebt El Maârif",
    region: "6",
  },
  {
    id: "284",
    ville: "Sebt Gzoula",
    region: "7",
  },
  {
    id: "285",
    ville: "Sebt Jahjouh",
    region: "3",
  },
  {
    id: "286",
    ville: "Selouane",
    region: "2",
  },
  {
    id: "287",
    ville: "Settat",
    region: "6",
  },
  {
    id: "288",
    ville: "Sid L'Mokhtar",
    region: "7",
  },
  {
    id: "289",
    ville: "Sid Zouin",
    region: "7",
  },
  {
    id: "290",
    ville: "Sidi Abdallah Ghiat",
    region: "7",
  },
  {
    id: "291",
    ville: "Sidi Addi",
    region: "3",
  },
  {
    id: "292",
    ville: "Sidi Ahmed",
    region: "7",
  },
  {
    id: "293",
    ville: "Sidi Ali Ban Hamdouche",
    region: "6",
  },
  {
    id: "294",
    ville: "Sidi Allal El Bahraoui",
    region: "4",
  },
  {
    id: "295",
    ville: "Sidi Allal Tazi",
    region: "4",
  },
  {
    id: "296",
    ville: "Sidi Bennour",
    region: "6",
  },
  {
    id: "297",
    ville: "Sidi Bou Othmane",
    region: "7",
  },
  {
    id: "298",
    ville: "Sidi Boubker",
    region: "2",
  },
  {
    id: "299",
    ville: "Sidi Bouknadel",
    region: "4",
  },
  {
    id: "300",
    ville: "Sidi Bouzid",
    region: "6",
  },
  {
    id: "301",
    ville: "Sidi Ifni",
    region: "10",
  },
  {
    id: "302",
    ville: "Sidi Jaber",
    region: "5",
  },
  {
    id: "303",
    ville: "Sidi Kacem",
    region: "4",
  },
  {
    id: "304",
    ville: "Sidi Lyamani",
    region: "1",
  },
  {
    id: "305",
    ville: "Sidi Mohamed ben Abdallah el-Raisuni",
    region: "1",
  },
  {
    id: "306",
    ville: "Sidi Rahhal",
    region: "7",
  },
  {
    id: "307",
    ville: "Sidi Rahhal Chataï",
    region: "6",
  },
  {
    id: "308",
    ville: "Sidi Slimane",
    region: "4",
  },
  {
    id: "309",
    ville: "Sidi Slimane Echcharaa",
    region: "2",
  },
  {
    id: "310",
    ville: "Sidi Smaïl",
    region: "6",
  },
  {
    id: "311",
    ville: "Sidi Taibi",
    region: "4",
  },
  {
    id: "312",
    ville: "Sidi Yahya El Gharb",
    region: "4",
  },
  {
    id: "313",
    ville: "Skhinate",
    region: "3",
  },
  {
    id: "314",
    ville: "Skhirate",
    region: "4",
  },
  {
    id: "315",
    ville: "Skhour Rehamna",
    region: "7",
  },
  {
    id: "316",
    ville: "Skoura",
    region: "8",
  },
  {
    id: "317",
    ville: "Smimou",
    region: "7",
  },
  {
    id: "318",
    ville: "Soualem",
    region: "6",
  },
  {
    id: "319",
    ville: "Souk El Arbaa",
    region: "4",
  },
  {
    id: "320",
    ville: "Souk Sebt Oulad Nemma",
    region: "5",
  },
  {
    id: "321",
    ville: "Stehat",
    region: "1",
  },
  {
    id: "322",
    ville: "Séfrou",
    region: "3",
  },
  {
    id: "323",
    ville: "Tabounte",
    region: "8",
  },
  {
    id: "324",
    ville: "Tafajight",
    region: "3",
  },
  {
    id: "325",
    ville: "Tafetachte",
    region: "7",
  },
  {
    id: "326",
    ville: "Tafraout",
    region: "9",
  },
  {
    id: "327",
    ville: "Taghjijt",
    region: "10",
  },
  {
    id: "328",
    ville: "Taghzout",
    region: "1",
  },
  {
    id: "329",
    ville: "Tagzen",
    region: "9",
  },
  {
    id: "330",
    ville: "Tahannaout",
    region: "7",
  },
  {
    id: "331",
    ville: "Tahla‎",
    region: "3",
  },
  {
    id: "332",
    ville: "Tala Tazegwaght‎",
    region: "1",
  },
  {
    id: "333",
    ville: "Taliouine",
    region: "9",
  },
  {
    id: "334",
    ville: "Talmest",
    region: "7",
  },
  {
    id: "335",
    ville: "Talsint",
    region: "2",
  },
  {
    id: "336",
    ville: "Tamallalt",
    region: "7",
  },
  {
    id: "337",
    ville: "Tamanar",
    region: "7",
  },
  {
    id: "338",
    ville: "Tamansourt",
    region: "7",
  },
  {
    id: "339",
    ville: "Tamassint‎",
    region: "1",
  },
  {
    id: "340",
    ville: "Tamegroute",
    region: "8",
  },
  {
    id: "341",
    ville: "Tameslouht",
    region: "7",
  },
  {
    id: "342",
    ville: "Tamesna",
    region: "4",
  },
  {
    id: "343",
    ville: "Tamraght",
    region: "9",
  },
  {
    id: "344",
    ville: "Tan-Tan",
    region: "10",
  },
  {
    id: "345",
    ville: "Tanalt",
    region: "9",
  },
  {
    id: "346",
    ville: "Tanger‎",
    region: "1",
  },
  {
    id: "347",
    ville: "Tanoumrite Nkob Zagora",
    region: "8",
  },
  {
    id: "348",
    ville: "Taounate‎",
    region: "3",
  },
  {
    id: "349",
    ville: "Taourirt",
    region: "2",
  },
  {
    id: "350",
    ville: "Taourirt ait zaghar",
    region: "8",
  },
  {
    id: "351",
    ville: "Tarfaya‎",
    region: "11",
  },
  {
    id: "352",
    ville: "Targuist‎",
    region: "1",
  },
  {
    id: "353",
    ville: "Taroudannt",
    region: "9",
  },
  {
    id: "354",
    ville: "Tata",
    region: "9",
  },
  {
    id: "355",
    ville: "Taza‎",
    region: "3",
  },
  {
    id: "356",
    ville: "Taïnaste‎",
    region: "3",
  },
  {
    id: "357",
    ville: "Temsia",
    region: "9",
  },
  {
    id: "358",
    ville: "Tendrara",
    region: "2",
  },
  {
    id: "359",
    ville: "Thar Es-Souk‎",
    region: "3",
  },
  {
    id: "360",
    ville: "Tichoute",
    region: "8",
  },
  {
    id: "361",
    ville: "Tiddas",
    region: "4",
  },
  {
    id: "362",
    ville: "Tiflet",
    region: "4",
  },
  {
    id: "363",
    ville: "Tifnit",
    region: "9",
  },
  {
    id: "364",
    ville: "Tighassaline",
    region: "5",
  },
  {
    id: "365",
    ville: "Tighza",
    region: "5",
  },
  {
    id: "366",
    ville: "Timahdite",
    region: "3",
  },
  {
    id: "367",
    ville: "Tinejdad",
    region: "8",
  },
  {
    id: "368",
    ville: "Tisgdal",
    region: "9",
  },
  {
    id: "369",
    ville: "Tissa‎",
    region: "3",
  },
  {
    id: "370",
    ville: "Tit Mellil",
    region: "6",
  },
  {
    id: "371",
    ville: "Tizguite",
    region: "3",
  },
  {
    id: "372",
    ville: "Tizi Ouasli‎",
    region: "3",
  },
  {
    id: "373",
    ville: "Tiznit",
    region: "9",
  },
  {
    id: "374",
    ville: "Tiztoutine",
    region: "2",
  },
  {
    id: "375",
    ville: "Touarga",
    region: "4",
  },
  {
    id: "376",
    ville: "Touima",
    region: "2",
  },
  {
    id: "377",
    ville: "Touissit",
    region: "2",
  },
  {
    id: "378",
    ville: "Toulal",
    region: "3",
  },
  {
    id: "379",
    ville: "Toundoute",
    region: "8",
  },
  {
    id: "380",
    ville: "Tounfite",
    region: "8",
  },
  {
    id: "381",
    ville: "Témara",
    region: "4",
  },
  {
    id: "382",
    ville: "Tétouan‎",
    region: "1",
  },
  {
    id: "383",
    ville: "Youssoufia",
    region: "7",
  },
  {
    id: "384",
    ville: "Zag",
    region: "10",
  },
  {
    id: "385",
    ville: "Zagora",
    region: "8",
  },
  {
    id: "386",
    ville: "Zaouia d'Ifrane",
    region: "3",
  },
  {
    id: "387",
    ville: "Zaouïat Cheikh",
    region: "5",
  },
  {
    id: "388",
    ville: "Zaïda",
    region: "8",
  },
  {
    id: "389",
    ville: "Zaïo",
    region: "2",
  },
  {
    id: "390",
    ville: "Zeghanghane",
    region: "2",
  },
  {
    id: "391",
    ville: "Zeubelemok",
    region: "7",
  },
  {
    id: "392",
    ville: "Zinat",
    region: "1",
  },
];
const sectors = ["ain sbaa", "oulfa", "hay hassani", "arrahma", "bernoussi"];

interface IData {
  type: string;
  name?: string;
  person_first_name: string;
  person_last_name: string;
  person_status?: string;
  city: string;
  sector: string;
  phone: string;
  email: string;
  password: string;
  password_confirmation: string;
  activity: string;
  note?: string;
}

const EmployerSignUp: React.FC = () => {
  const [responseMessage, setResponseMessage] = useState("");
  const [passwordMessage, setPasswordMessage] = useState("");
  const employerDispatch = useContext(EmployerDispatchContext);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IData>();

  const handleSelect = (e: any) => {
    const inputs = document.querySelectorAll(".company");
    const choice = e.target.value;

    if (choice === "particular") {
      inputs.forEach((input) => {
        input.classList.add("hidden");
      });
    } else {
      inputs.forEach((input) => {
        input.classList.remove("hidden");
      });
    }
  };

  const handleActivitySelect = (e: any) => {
    const choice = e.target.value;
    const input = document.querySelector("#activity-field");
    if (choice === "autre") {
      input?.classList.remove("hidden");
    } else {
      input?.classList.add("hidden");
    }
  };

  const handleSignUp = async (data: IData) => {
    const activitySelect = (
      document.querySelector("#activities") as HTMLInputElement
    ).value;

    if (data.password !== data.password_confirmation) {
      setPasswordMessage("Vos mots de passe ne sont pas les memes !");
      return;
    }
    setPasswordMessage("");
    data.activity = data.activity || activitySelect;

    await signUpEmployer(data, setResponseMessage, employerDispatch);
  };

  return (
    <div>
      <Navbar />
      <div
        id="content"
        className="min-h-[90.9vh] px-20 pt-20 bg-slate-800 text-white"
      >
        <h1 className="mb-10 text-2xl font-medium">S'inscrire</h1>
        <form
          method="post"
          className="pb-10 flex flex-col items-start gap-y-6 w-full max-w-[600px]"
        >
          <div className="form-group w-full flex flex-col gap-y-2">
            <label htmlFor="type">Type de l'entité</label>
            <select
              {...register("type")}
              onChange={handleSelect}
              className="w-full h-8 rounded-sm text-black outline-none pl-2"
              name="type"
              id="type"
            >
              <option value="company">Société</option>
              <option value="particular">Particulier</option>
            </select>
          </div>
          <div className="form-group w-full flex flex-col gap-y-2 company">
            <label htmlFor="name">Nom de l'entité</label>
            <input
              {...register("name")}
              className="w-full h-8 rounded-sm text-black outline-none pl-2"
              type="text"
              name="name"
              id="name"
            />
          </div>
          <div className="form-group w-full flex flex-col gap-y-2">
            <label htmlFor="person_first_name">Prénom</label>
            <input
              {...register("person_first_name", {
                required: "Veuillez entrez votre prénom",
              })}
              className="w-full h-8 rounded-sm text-black outline-none pl-2"
              type="text"
              name="person_first_name"
              id="person_first_name"
            />
            <p className="text-sm font-medium text-red-500">
              {errors.person_first_name?.message}
            </p>
          </div>
          <div className="form-group w-full flex flex-col gap-y-2">
            <label htmlFor="person_last_name">Nom</label>
            <input
              {...register("person_last_name", {
                required: true,
              })}
              className="w-full h-8 rounded-sm text-black outline-none pl-2"
              type="text"
              name="person_last_name"
              id="person_last_name"
            />
            <p className="text-sm font-medium text-red-500">
              {errors.person_last_name?.message}
            </p>
          </div>
          <div className="form-group w-full flex flex-col gap-y-2 company">
            <label htmlFor="person_status">Statut</label>
            <input
              {...register("person_status")}
              className="w-full h-8 rounded-sm text-black outline-none pl-2"
              type="text"
              name="person_status"
              id="person_status"
            />
          </div>
          <div className="form-group w-full flex flex-col gap-y-2">
            <label htmlFor="city">Ville</label>

            <select
              {...register("city")}
              className="w-full h-8 rounded-sm text-black outline-none pl-2"
              name="city"
              id="city"
            >
              {cities.map((city: any) => {
                return (
                  <option
                    key={city.ville}
                    className="capitalize"
                    value={city.ville}
                  >
                    {city.ville}
                  </option>
                );
              })}
            </select>
          </div>
          <div className="form-group w-full flex flex-col gap-y-2">
            <label htmlFor="sector">Secteur</label>
            <select
              {...register("sector")}
              className="w-full h-8 rounded-sm text-black outline-none pl-2"
              name="sector"
              id="sector"
            >
              {sectors.map((sector: string) => {
                return (
                  <option key={sector} className="capitalize" value={sector}>
                    {sector}
                  </option>
                );
              })}
            </select>
            <p className="text-sm font-medium text-red-500">
              {errors.sector?.message}
            </p>
          </div>
          <div className="form-group w-full flex flex-col gap-y-2">
            <label htmlFor="email">Email</label>
            <input
              {...register("email", {
                required: "Email est obligatoire",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "Veuillez entrez un email valide",
                },
              })}
              className="w-full h-8 rounded-sm text-black outline-none pl-2"
              type="text"
              name="email"
              id="email"
            />
            <p className="text-sm font-medium text-red-500">
              {errors.email?.message}
            </p>
          </div>
          <div className="form-group w-full flex flex-col gap-y-2">
            <label htmlFor="phone">Téléphone</label>
            <input
              {...register("phone", {
                required: "Veuillez entrez votre numéro de téléphone",
              })}
              className="w-full h-8 rounded-sm text-black outline-none pl-2"
              type="tel"
              name="phone"
              id="phone"
            />
            <p className="text-sm font-medium text-red-500">
              {errors.phone?.message}
            </p>
          </div>

          <div className="form-group w-full flex flex-col gap-y-2">
            <label htmlFor="activities">Activité principale</label>
            <select
              onChange={handleActivitySelect}
              className="w-full h-8 rounded-sm text-black outline-none pl-2"
              name="activities"
              id="activities"
            >
              {services.map((service: string) => {
                return (
                  <option key={service} className="capitalize" value={service}>
                    {service}
                  </option>
                );
              })}
            </select>
          </div>

          <div
            className="form-group w-full flex flex-col gap-y-2 hidden"
            id="activity-field"
          >
            <label htmlFor="activité">
              Quelle est votre activité principale ?
            </label>
            <input
              {...register("activity")}
              className="w-full h-8 rounded-sm text-black outline-none pl-2"
              type="text"
              name="activité"
              id="activité"
            />
          </div>

          <div className="form-group w-full flex flex-col gap-y-2">
            <label htmlFor="password">Mot de passe</label>
            <input
              {...register("password", {
                required: "Le mot de passe est obligatoire",
                minLength: {
                  value: 8,
                  message:
                    "Votre mot de passe doit contenir au moins 8 lettres et/ou nombres",
                },
              })}
              className="w-full h-8 rounded-sm text-black outline-none pl-2"
              type="password"
              name="password"
              id="password"
            />
            <p className="text-sm font-medium text-red-500">
              {errors.password?.message}
            </p>
          </div>
          <div className="form-group w-full flex flex-col gap-y-2">
            <label htmlFor="password_confirmation">
              Confirmez votre mot de passe
            </label>
            <input
              {...register("password_confirmation", {
                required: "La confirmation du mot de passe est obligatoire",
              })}
              className="w-full h-8 rounded-sm text-black outline-none pl-2"
              type="password"
              name="password_confirmation"
              id="password_confirmation"
            />
            <p className="text-sm font-medium text-red-500">
              {errors.password_confirmation?.message || passwordMessage}
            </p>
          </div>

          <div className="form-group w-full flex flex-col gap-y-2">
            <label htmlFor="note">Vous avez quelque chose à ajouter ?</label>
            <textarea
              {...register("note")}
              rows={5}
              className="w-full rounded-sm text-black outline-none p-2"
              name="note"
              id="note"
            ></textarea>
          </div>
          <p className="text-sm font-medium text-red-500">{responseMessage}</p>
          <button
            onClick={handleSubmit(handleSignUp)}
            type="submit"
            className="px-6 py-2 bg-black text-white font-semibold rounded-md hover:bg-white hover:text-black transition-all duration-200"
          >
            S'inscrire
          </button>
        </form>
      </div>
    </div>
  );
};

export default EmployerSignUp;
