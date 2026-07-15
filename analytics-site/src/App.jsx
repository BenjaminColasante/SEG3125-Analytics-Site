import { useEffect, useId, useState } from "react";
import {Badge, Button, ButtonGroup, Card, Col, Container, Form, Nav, Navbar, Row,} from "react-bootstrap";
import priceCsv from "./data/canada-produce-prices-2025.csv?raw";
import priceCsvUrl from "./data/canada-produce-prices-2025.csv?url";
import "./App.css";

const FOOD_KEYS = ["tomatoes", "apples", "bananas", "onions", "peppers"];

function splitCsvRow(row) {
  const columns = [];
  let currentColumn = "";
  let insideQuotes = false;

  for (let index = 0; index < row.length; index += 1) {
    const character = row[index];

    if (character === '"') {
      insideQuotes = !insideQuotes;
    } else if (character === "," && !insideQuotes) {
      columns.push(currentColumn);
      currentColumn = "";
    } else {
      currentColumn += character;
    }
  }

  columns.push(currentColumn);
  return columns;
}

function readPriceData(csvText) {
  const data = {
    tomatoes: [],
    apples: [],
    bananas: [],
    onions: [],
    peppers: [],
  };

  const rows = csvText.trim().split("\n");

  for (let rowIndex = 1; rowIndex < rows.length; rowIndex += 1) {
    const columns = splitCsvRow(rows[rowIndex]);
    const productName = columns[2].split(",")[0].toLowerCase();
    const price = Number(columns[4]);

    if (FOOD_KEYS.includes(productName)) {
      data[productName].push(price);
    }
  }

  return data;
}

const DATA = readPriceData(priceCsv);

const COPY = {
  en: {
    language: "Français",
    languageAria: "Afficher le site en français",
    eyebrow: "Canadian grocery snapshot",
    title: "What is happening to produce prices?",
    intro:
      "Explore how the average price of five everyday foods changed across 2025. Compare trends over time, then inspect one month side by side.",
    sourceBadge: "Statistics Canada data",
    sourceNote:
      "Official monthly average retail prices for Canada from Table 18-10-0245-01.",
    updated: "Source release",
    updatedDate: "July 2, 2026",
    navOverview: "Overview",
    navTrends: "Price trends",
    navCompare: "Compare foods",
    filtersTitle: "Dashboard filters",
    filtersBody: "These settings apply to every price, summary, and chart.",
    currency: "Currency",
    resetFilters: "Reset all filters",
    rateNote:
      "Currency conversions use fixed demonstration rates: 1 CAD = 0.73 USD = 0.67 EUR.",
    avgPrice: "Average December price",
    biggestRise: "Largest annual increase",
    lowestNow: "Lowest December price",
    acrossFoods: "across 5 foods",
    fromJan: "since January",
    perUnit: "per kg",
    lineKicker: "Price trend",
    lineTitle: "How has the price changed?",
    lineBody:
      "Follow one food through the year. The direct labels and highlighted endpoints keep attention on the overall direction.",
    chooseFood: "Choose a food",
    compareFood: "Compare with",
    noComparison: "No comparison",
    showMarkers: "Show monthly points",
    unit: "Display unit",
    kg: "Per kilogram",
    lb: "Per pound",
    period: "Time period",
    fullYear: "Full year",
    firstHalf: "January–June",
    secondHalf: "July–December",
    jan: "Jan",
    feb: "Feb",
    mar: "Mar",
    apr: "Apr",
    may: "May",
    jun: "Jun",
    jul: "Jul",
    aug: "Aug",
    sep: "Sep",
    oct: "Oct",
    nov: "Nov",
    dec: "Dec",
    chartSummary: (food, startValue, endValue, change, startMonth, endMonth) =>
      `${food}: ${startValue} in ${startMonth} and ${endValue} in ${endMonth}, a ${change} change.`,
    start: "January",
    end: "December",
    peak: "Peak",
    priceAxis: "Average price (CAD)",
    monthAxis: "Month",
    barKicker: "Monthly comparison",
    barTitle: "Which food costs more?",
    barBody:
      "Choose a month, narrow the number of foods, and change their order. Bars share a zero baseline so differences remain honest and easy to scan.",
    chooseMonth: "Choose a month",
    averagePrice: "Average price",
    averageShort: "Average",
    selectedMonth: "Selected month",
    itemsShown: "Items shown",
    allItems: "All 5 foods",
    threeItems: "3 foods",
    sortBy: "Sort bars",
    highLow: "Price: high to low",
    lowHigh: "Price: low to high",
    alphabetical: "Food name: A–Z",
    showValues: "Show exact values",
    showAverage: "Show average line",
    insight: "Quick read",
    chartNote: "Each point represents one month of recorded price data.",
    markersOffNote:
      "Monthly points are hidden. Turn them on to show each recorded month.",
    periodStart: "Start of selected period",
    vsPrevious: "vs previous month",
    aboveAverage: "above average",
    belowAverage: "below average",
    barInsight: (high, low, amount) =>
      `Highest: ${high}. Lowest: ${low}. The difference is ${amount}.`,
    methodology: "About this dashboard",
    methodText:
      "This dashboard uses 60 Canada-level observations from Statistics Canada Table 18-10-0245-01: five products reported per kilogram across all twelve months of 2025. Source prices are in current Canadian dollars per kilogram and are converted to the selected display settings. Average prices can also reflect changes in brands, quality, and product mix.",
    sourceLabel: "View official source",
    downloadLabel: "Download dashboard CSV",
    footer: "Produce Pulse · Interactive dashboard prototype",
    skip: "Skip to dashboard content",
    foods: {
      tomatoes: "Tomatoes",
      apples: "Apples",
      bananas: "Bananas",
      onions: "Onions",
      peppers: "Peppers",
    },
  },
  fr: {
    language: "English",
    languageAria: "Show site in English",
    eyebrow: "Aperçu de l’épicerie canadienne",
    title: "Que se passe-t-il avec le prix des produits frais?",
    intro:
      "Découvrez comment le prix moyen de cinq aliments courants a évolué en 2025. Comparez les tendances, puis examinez un mois en détail.",
    sourceBadge: "Données de Statistique Canada",
    sourceNote:
      "Prix de détail moyens mensuels officiels pour le Canada, tirés du tableau 18-10-0245-01.",
    updated: "Diffusion de la source",
    updatedDate: "2 juillet 2026",
    navOverview: "Aperçu",
    navTrends: "Tendances",
    navCompare: "Comparer",
    filtersTitle: "Filtres du tableau de bord",
    filtersBody:
      "Ces réglages s’appliquent à tous les prix, résumés et graphiques.",
    currency: "Devise",
    resetFilters: "Réinitialiser les filtres",
    rateNote:
      "Les conversions utilisent des taux de démonstration fixes : 1 CAD = 0,73 USD = 0,67 EUR.",
    avgPrice: "Prix moyen en décembre",
    biggestRise: "Plus forte hausse annuelle",
    lowestNow: "Prix le plus bas en décembre",
    acrossFoods: "pour 5 aliments",
    fromJan: "depuis janvier",
    perUnit: "par kg",
    lineKicker: "Tendance des prix",
    lineTitle: "Comment le prix a-t-il évolué?",
    lineBody:
      "Suivez un aliment pendant l’année. Les étiquettes directes et les extrémités accentuées mettent en évidence la tendance générale.",
    chooseFood: "Choisir un aliment",
    compareFood: "Comparer avec",
    noComparison: "Aucune comparaison",
    showMarkers: "Afficher les points mensuels",
    unit: "Unité affichée",
    kg: "Par kilogramme",
    lb: "Par livre",
    period: "Période",
    fullYear: "Toute l’année",
    firstHalf: "Janvier à juin",
    secondHalf: "Juillet à décembre",
    jan: "janv.",
    feb: "févr.",
    mar: "mars",
    apr: "avr.",
    may: "mai",
    jun: "juin",
    jul: "juill.",
    aug: "août",
    sep: "sept.",
    oct: "oct.",
    nov: "nov.",
    dec: "déc.",
    chartSummary: (food, startValue, endValue, change, startMonth, endMonth) =>
      `${food} : ${startValue} en ${startMonth} et ${endValue} en ${endMonth}, soit une variation de ${change}.`,
    start: "Janvier",
    end: "Décembre",
    peak: "Sommet",
    priceAxis: "Prix moyen (CAD)",
    monthAxis: "Mois",
    barKicker: "Comparaison mensuelle",
    barTitle: "Quel aliment coûte le plus cher?",
    barBody:
      "Choisissez un mois, limitez le nombre d’aliments et changez leur ordre. Les barres partent de zéro afin de présenter les écarts honnêtement et clairement.",
    chooseMonth: "Choisir un mois",
    averagePrice: "Prix moyen",
    averageShort: "Moyenne",
    selectedMonth: "Mois sélectionné",
    itemsShown: "Aliments affichés",
    allItems: "Les 5 aliments",
    threeItems: "3 aliments",
    sortBy: "Trier les barres",
    highLow: "Prix : décroissant",
    lowHigh: "Prix : croissant",
    alphabetical: "Nom : A à Z",
    showValues: "Afficher les valeurs exactes",
    showAverage: "Afficher la ligne moyenne",
    insight: "À retenir",
    chartNote: "Chaque point représente un mois de données sur les prix.",
    markersOffNote:
      "Les points mensuels sont masqués. Affichez-les pour montrer chaque mois enregistré.",
    periodStart: "Début de la période",
    vsPrevious: "par rapport au mois précédent",
    aboveAverage: "au-dessus de la moyenne",
    belowAverage: "sous la moyenne",
    barInsight: (high, low, amount) =>
      `Prix le plus élevé : ${high}. Prix le plus bas : ${low}. L’écart est de ${amount}.`,
    methodology: "À propos du tableau de bord",
    methodText:
      "Ce tableau de bord utilise 60 observations canadiennes du tableau 18-10-0245-01 de Statistique Canada : cinq produits déclarés par kilogramme pendant les douze mois de 2025. Les prix sources sont en dollars canadiens courants par kilogramme et sont convertis selon les réglages choisis. Les prix moyens peuvent aussi refléter des changements de marque, de qualité et de composition des produits.",
    sourceLabel: "Voir la source officielle",
    downloadLabel: "Télécharger les données CSV",
    footer: "Pouls des produits · Prototype de tableau de bord interactif",
    skip: "Aller au contenu du tableau de bord",
    foods: {
      tomatoes: "Tomates",
      apples: "Pommes",
      bananas: "Bananes",
      onions: "Oignons",
      peppers: "Poivrons",
    },
  },
};

const MONTH_KEYS = [
  "jan",
  "feb",
  "mar",
  "apr",
  "may",
  "jun",
  "jul",
  "aug",
  "sep",
  "oct",
  "nov",
  "dec",
];
const COLORS = {
  tomatoes: "#d6534d",
  apples: "#d4a72c",
  bananas: "#c5a62b",
  onions: "#8b6a9d",
  peppers: "#43836d",
};
const CURRENCY_RATES = { CAD: 1, USD: 0.73, EUR: 0.67 };
const PERIODS = {
  year: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11],
  first: [0, 1, 2, 3, 4, 5],
  second: [6, 7, 8, 9, 10, 11],
};

function formatMoney(value, lang, currency = "CAD") {
  const locale = lang.startsWith("fr") ? "fr-CA" : "en-CA";
  const convertedValue = value * CURRENCY_RATES[currency];

  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency: currency,
    minimumFractionDigits: 2,
  }).format(convertedValue);
}

function convertUnit(value, unit) {
  if (unit === "lb") {
    return value / 2.20462;
  }

  return value;
}

function getValuesForMonths(food, monthIndexes) {
  return monthIndexes.map((monthIndex) => DATA[food][monthIndex]);
}

function getDecemberAverage() {
  let total = 0;

  FOOD_KEYS.forEach((food) => {
    total += DATA[food][11];
  });

  return total / FOOD_KEYS.length;
}

function getAnnualChange(food) {
  const januaryPrice = DATA[food][0];
  const decemberPrice = DATA[food][11];
  return ((decemberPrice - januaryPrice) / januaryPrice) * 100;
}

function getItemsForMonth(month) {
  return FOOD_KEYS.map((food) => ({
    key: food,
    value: DATA[food][month],
  }));
}

function resizePointList(pointList, newLength) {
  const points = pointList.split(" ").map((point) => {
    const [x, y] = point.split(",").map(Number);
    return { x: x, y: y };
  });

  if (points.length === newLength) {
    return pointList;
  }

  const resizedPoints = [];

  for (let index = 0; index < newLength; index += 1) {
    const position = (index / Math.max(1, newLength - 1)) * (points.length - 1);
    const lowerIndex = Math.floor(position);
    const upperIndex = Math.min(points.length - 1, Math.ceil(position));
    const amount = position - lowerIndex;
    const x =
      points[lowerIndex].x +
      (points[upperIndex].x - points[lowerIndex].x) * amount;
    const y =
      points[lowerIndex].y +
      (points[upperIndex].y - points[lowerIndex].y) * amount;
    resizedPoints.push(`${x},${y}`);
  }

  return resizedPoints.join(" ");
}

function LineChart({
  values,
  comparisonValues,
  monthIndices,
  food,
  comparisonFood,
  color,
  lang,
  unit,
  currency,
  showMarkers,
  t,
}) {
  const id = useId();
  const [hoveredPoint, setHoveredPoint] = useState(null);
  const width = 760;
  const height = 330;
  const pad = { top: 30, right: 28, bottom: 56, left: 58 };
  const allValues = comparisonValues
    ? [...values, ...comparisonValues]
    : values;
  const max = Math.ceil(Math.max(...allValues) + 1);
  const min = Math.max(0, Math.floor(Math.min(...allValues) - 1));
  const lastValueIndex = values.length - 1;

  function x(index) {
    const chartWidth = width - pad.left - pad.right;
    const numberOfSpaces = Math.max(1, values.length - 1);
    return pad.left + index * (chartWidth / numberOfSpaces);
  }

  function y(value) {
    const chartHeight = height - pad.top - pad.bottom;
    const priceRange = max - min;
    return pad.top + (max - value) * (chartHeight / priceRange);
  }

  const points = values
    .map((value, index) => `${x(index)},${y(value)}`)
    .join(" ");
  const comparisonPoints = comparisonValues
    ?.map((value, index) => `${x(index)},${y(value)}`)
    .join(" ");
  const currentComparisonPoints = comparisonPoints || points;
  const [animation, setAnimation] = useState({
    points: points,
    comparisonPoints: currentComparisonPoints,
    oldPoints: points,
    oldComparisonPoints: currentComparisonPoints,
  });

  if (
    animation.points !== points ||
    animation.comparisonPoints !== currentComparisonPoints
  ) {
    setAnimation({
      points: points,
      comparisonPoints: currentComparisonPoints,
      oldPoints: resizePointList(animation.points, values.length),
      oldComparisonPoints: resizePointList(
        animation.comparisonPoints,
        comparisonValues?.length || values.length,
      ),
    });
  }

  const reduceMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)",
  ).matches;
  const peakIndex = values.indexOf(Math.max(...values));
  const change = ((values[lastValueIndex] - values[0]) / values[0]) * 100;
  const format = (value) =>
    formatMoney(convertUnit(value, unit), lang, currency);
  const startMonth = t[MONTH_KEYS[monthIndices[0]]];
  const lastMonthIndex = monthIndices[monthIndices.length - 1];
  const endMonth = t[MONTH_KEYS[lastMonthIndex]];
  const changeNumber = change.toLocaleString(
    lang === "fr" ? "fr-CA" : "en-CA",
    { maximumFractionDigits: 1 },
  );
  const changeText = `${change >= 0 ? "+" : ""}${changeNumber} %`;
  const chartDescription = t.chartSummary(
    t.foods[food],
    format(values[0]),
    format(values[lastValueIndex]),
    changeText,
    startMonth,
    endMonth,
  );
  const hoveredValues =
    hoveredPoint?.series === "comparison" ? comparisonValues : values;
  const hoveredValue = hoveredPoint ? hoveredValues[hoveredPoint.index] : null;
  const hoveredFood =
    hoveredPoint?.series === "comparison" ? comparisonFood : food;
  const hoveredMonth = hoveredPoint
    ? t[MONTH_KEYS[monthIndices[hoveredPoint.index]]]
    : "";
  let hoveredChangeText = t.periodStart;

  if (hoveredPoint && hoveredPoint.index > 0) {
    const previousValue = hoveredValues[hoveredPoint.index - 1];
    const percentChange =
      ((hoveredValue - previousValue) / previousValue) * 100;
    const formattedChange = Math.abs(percentChange).toLocaleString(
      lang === "fr" ? "fr-CA" : "en-CA",
      { maximumFractionDigits: 1 },
    );
    const sign = percentChange >= 0 ? "+" : "−";
    hoveredChangeText = `${sign}${formattedChange}% ${t.vsPrevious}`;
  }

  return (
    <div className="chart-wrap">
      {comparisonValues && (
        <div className="chart-legend" aria-label={t.compareFood}>
          <span>
            <i style={{ background: color }}></i>
            {t.foods[food]}
          </span>
          <span>
            <i className="comparison-swatch"></i>
            {t.foods[comparisonFood]}
          </span>
        </div>
      )}
      <p className="visually-hidden" id={`${id}-desc`}>
        {chartDescription}
      </p>
      <svg
        className="line-chart"
        viewBox={`0 0 ${width} ${height}`}
        role="img"
        aria-labelledby={`${id}-title ${id}-desc`}
      >
        <title id={`${id}-title`}>
          {t.lineTitle}: {t.foods[food]}
        </title>
        {[min, min + (max - min) / 2, max].map((tick) => (
          <g key={tick}>
            <line
              x1={pad.left}
              x2={width - pad.right}
              y1={y(tick)}
              y2={y(tick)}
              className="grid-line"
            />
            <text
              x={pad.left - 12}
              y={y(tick) + 5}
              textAnchor="end"
              className="axis-text"
            >
              {format(tick)}
            </text>
          </g>
        ))}
        {monthIndices.map((monthIndex, index) => (
          <text
            key={monthIndex}
            x={x(index)}
            y={height - 20}
            textAnchor="middle"
            className="axis-text"
          >
            {t[MONTH_KEYS[monthIndex]]}
          </text>
        ))}
        <polyline
          points={points}
          fill="none"
          stroke={color}
          strokeWidth="4"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          {!reduceMotion && animation.oldPoints !== points && (
            <animate
              key={points}
              attributeName="points"
              from={animation.oldPoints}
              to={points}
              dur="450ms"
              fill="freeze"
            />
          )}
        </polyline>
        {comparisonValues && (
          <polyline
            points={comparisonPoints}
            fill="none"
            stroke="#6b788b"
            strokeWidth="3"
            strokeDasharray="8 7"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            {!reduceMotion &&
              animation.oldComparisonPoints !== comparisonPoints && (
                <animate
                  key={comparisonPoints}
                  attributeName="points"
                  from={animation.oldComparisonPoints}
                  to={comparisonPoints}
                  dur="450ms"
                  fill="freeze"
                />
              )}
          </polyline>
        )}
        {showMarkers &&
          values.map((value, index) => (
            <g
              key={monthIndices[index]}
              className="data-point"
              aria-label={`${t.foods[food]}, ${t[MONTH_KEYS[monthIndices[index]]]}: ${format(value)}`}
              onMouseEnter={() =>
                setHoveredPoint({ series: "primary", index: index })
              }
              onMouseLeave={() => setHoveredPoint(null)}
            >
              <circle
                cx={x(index)}
                cy={y(value)}
                r="4.5"
                fill="#fff"
                stroke={color}
                strokeWidth="3"
              />
            </g>
          ))}
        {showMarkers &&
          comparisonValues?.map((value, index) => (
            <g
              key={`comparison-${monthIndices[index]}`}
              className="data-point"
              aria-label={`${t.foods[comparisonFood]}, ${t[MONTH_KEYS[monthIndices[index]]]}: ${format(value)}`}
              onMouseEnter={() =>
                setHoveredPoint({ series: "comparison", index: index })
              }
              onMouseLeave={() => setHoveredPoint(null)}
            >
              <circle
                cx={x(index)}
                cy={y(value)}
                r="4.5"
                fill="#fff"
                stroke="#6b788b"
                strokeWidth="3"
              />
            </g>
          ))}
        <g
          transform={`translate(${x(peakIndex)},${y(values[peakIndex]) - 17})`}
        >
          <rect x="-30" y="-20" width="60" height="24" rx="12" fill={color} />
          <text textAnchor="middle" y="-4" className="callout-text">
            {t.peak}
          </text>
        </g>
        {hoveredPoint && (
          <g
            className="chart-hover-tooltip"
            transform={`translate(${Math.min(width - 88, Math.max(88, x(hoveredPoint.index)))},${y(hoveredValue) < 74 ? y(hoveredValue) + 48 : y(hoveredValue) - 46})`}
          >
            <rect x="-82" y="-26" width="164" height="42" rx="7" />
            <text className="hover-tooltip-main" textAnchor="middle" y="-10">
              {t.foods[hoveredFood]} · {hoveredMonth} · {format(hoveredValue)}
            </text>
            <text className="hover-tooltip-detail" textAnchor="middle" y="7">
              {hoveredChangeText}
            </text>
          </g>
        )}
      </svg>
      <div className="chart-ends" aria-hidden="true">
        <span>
          <small>{startMonth}</small>
          <strong>{format(values[0])}</strong>
        </span>
        <span>
          <small>{endMonth}</small>
          <strong>{format(values[lastValueIndex])}</strong>
        </span>
      </div>
    </div>
  );
}

function BarChart({
  month,
  items,
  lang,
  unit,
  currency,
  showValues,
  showAverage,
  t,
}) {
  const id = useId();
  const [hoveredBar, setHoveredBar] = useState(null);
  const width = 760;
  const height = 350;
  const pad = { top: 20, right: 32, bottom: 74, left: 58 };
  const max = Math.ceil(Math.max(...items.map((item) => item.value)) + 1);

  function y(value) {
    const chartHeight = height - pad.top - pad.bottom;
    return pad.top + (max - value) * (chartHeight / max);
  }

  const gap = 28;
  const availableWidth = width - pad.left - pad.right;
  const totalGapWidth = gap * (items.length - 1);
  const barWidth = Math.min(
    110,
    (availableWidth - totalGapWidth) / items.length,
  );
  const chartWidth = barWidth * items.length + gap * (items.length - 1);
  const startX = pad.left + (availableWidth - chartWidth) / 2;
  const format = (value) =>
    formatMoney(convertUnit(value, unit), lang, currency);
  let total = 0;

  items.forEach((item) => {
    total += item.value;
  });

  const average = total / items.length;
  const hoveredItem = hoveredBar !== null ? items[hoveredBar] : null;
  let averageDifferenceText = "";
  let tooltipX = 0;
  let tooltipY = 0;

  if (hoveredItem) {
    const percentFromAverage = ((hoveredItem.value - average) / average) * 100;
    const formattedDifference = Math.abs(percentFromAverage).toLocaleString(
      lang === "fr" ? "fr-CA" : "en-CA",
      { maximumFractionDigits: 1 },
    );
    const direction = percentFromAverage >= 0 ? t.aboveAverage : t.belowAverage;
    averageDifferenceText = `${formattedDifference}% ${direction}`;

    const barTop = y(hoveredItem.value);
    tooltipX = startX + hoveredBar * (barWidth + gap) + barWidth / 2;
    tooltipY = barTop < 80 ? barTop + 55 : barTop - 46;
  }
  return (
    <div className="chart-wrap">
      <p className="visually-hidden" id={`${id}-desc`}>
        {t.barTitle}. {t.selectedMonth}: {t[MONTH_KEYS[month]]}.{" "}
        {showAverage && `${t.averagePrice}: ${format(average)}.`}
      </p>
      {showAverage && (
        <div
          className="chart-legend average-legend"
          aria-label={`${t.averagePrice}: ${format(average)}`}
        >
          <span>
            <i className="average-swatch"></i>
            {t.averageShort}: <b>{format(average)}</b>
          </span>
        </div>
      )}
      <svg
        className="bar-chart"
        viewBox={`0 0 ${width} ${height}`}
        role="img"
        aria-labelledby={`${id}-title ${id}-desc`}
      >
        <title id={`${id}-title`}>{t.barTitle}</title>
        {[0, max / 2, max].map((tick) => (
          <g key={tick}>
            <line
              x1={pad.left}
              x2={width - pad.right}
              y1={y(tick)}
              y2={y(tick)}
              className="grid-line"
            />
            <text
              x={pad.left - 12}
              y={y(tick) + 5}
              textAnchor="end"
              className="axis-text"
            >
              {format(tick)}
            </text>
          </g>
        ))}
        {items.map((item, index) => {
          const barX = startX + index * (barWidth + gap);
          const barY = y(item.value);
          return (
            <g
              key={item.key}
              className="bar-mark"
              aria-label={`${t.foods[item.key]}: ${format(item.value)}`}
              onMouseEnter={() => setHoveredBar(index)}
              onMouseLeave={() => setHoveredBar(null)}
            >
              <rect
                x={barX}
                y={barY}
                width={barWidth}
                height={y(0) - barY}
                rx="7"
                fill={COLORS[item.key]}
              />
              <text
                x={barX + barWidth / 2}
                y={height - 44}
                textAnchor="middle"
                className="bar-label"
              >
                {t.foods[item.key]}
              </text>
            </g>
          );
        })}
        {showAverage && (
          <g className="average-line">
            <line
              x1={pad.left}
              x2={width - pad.right}
              y1={y(average)}
              y2={y(average)}
            />
          </g>
        )}
        {showValues &&
          items.map((item, index) => {
            const barX = startX + index * (barWidth + gap);
            return (
              <text
                key={`value-${item.key}`}
                x={barX + barWidth / 2}
                y={y(item.value) - 10}
                textAnchor="middle"
                className="bar-value"
              >
                {format(item.value)}
              </text>
            );
          })}
        {hoveredItem && (
          <g
            className="chart-hover-tooltip"
            transform={`translate(${tooltipX},${tooltipY})`}
          >
            <rect x="-76" y="-26" width="152" height="42" rx="7" />
            <text className="hover-tooltip-main" textAnchor="middle" y="-10">
              {t.foods[hoveredItem.key]} · {format(hoveredItem.value)}
            </text>
            <text className="hover-tooltip-detail" textAnchor="middle" y="7">
              {averageDifferenceText}
            </text>
          </g>
        )}
      </svg>
    </div>
  );
}

function App() {
  const [lang, setLang] = useState("en");
  const [food, setFood] = useState("tomatoes");
  const [month, setMonth] = useState(11);
  const [unit, setUnit] = useState("kg");
  const [currency, setCurrency] = useState("CAD");
  const [period, setPeriod] = useState("year");
  const [itemCount, setItemCount] = useState("all");
  const [sortOrder, setSortOrder] = useState("high");
  const [comparisonFood, setComparisonFood] = useState("none");
  const [showMarkers, setShowMarkers] = useState(true);
  const [showValues, setShowValues] = useState(true);
  const [showAverage, setShowAverage] = useState(false);

  const t = COPY[lang];
  const locale = lang === "fr" ? "fr-CA" : "en-CA";

  useEffect(() => {
    document.documentElement.lang = lang;
    document.title =
      lang === "fr"
        ? "Pouls des produits | Tableau de bord interactif"
        : "Produce Pulse | Interactive price dashboard";
  }, [lang]);

  const monthIndices = PERIODS[period];
  const selectedValues = getValuesForMonths(food, monthIndices);
  let comparisonValues = null;

  if (comparisonFood !== "none") {
    comparisonValues = getValuesForMonths(comparisonFood, monthIndices);
  }

  const averageDecemberPrice = getDecemberAverage();
  let biggestIncrease = {
    key: FOOD_KEYS[0],
    change: getAnnualChange(FOOD_KEYS[0]),
  };
  let lowestDecemberFood = FOOD_KEYS[0];

  FOOD_KEYS.forEach((foodKey) => {
    const change = getAnnualChange(foodKey);

    if (change > biggestIncrease.change) {
      biggestIncrease = { key: foodKey, change: change };
    }

    if (DATA[foodKey][11] < DATA[lowestDecemberFood][11]) {
      lowestDecemberFood = foodKey;
    }
  });

  let displayedItems = getItemsForMonth(month);

  if (sortOrder === "low") {
    displayedItems.sort((first, second) => first.value - second.value);
  } else if (sortOrder === "name") {
    displayedItems.sort((first, second) => {
      return t.foods[first.key].localeCompare(t.foods[second.key], locale);
    });
  } else {
    displayedItems.sort((first, second) => second.value - first.value);
  }

  if (itemCount === "three") {
    displayedItems = displayedItems.slice(0, 3);
  }

  let highestItem = displayedItems[0];
  let lowestItem = displayedItems[0];

  displayedItems.forEach((item) => {
    if (item.value > highestItem.value) {
      highestItem = item;
    }

    if (item.value < lowestItem.value) {
      lowestItem = item;
    }
  });

  function displayPrice(value) {
    const convertedValue = convertUnit(value, unit);
    return formatMoney(convertedValue, locale, currency);
  }

  function changeLanguage() {
    if (lang === "en") {
      setLang("fr");
    } else {
      setLang("en");
    }
  }

  function changeMainFood(event) {
    const newFood = event.target.value;
    setFood(newFood);

    if (comparisonFood === newFood) {
      setComparisonFood("none");
    }
  }

  function resetFilters() {
    setFood("tomatoes");
    setMonth(11);
    setUnit("kg");
    setCurrency("CAD");
    setPeriod("year");
    setItemCount("all");
    setSortOrder("high");
    setComparisonFood("none");
    setShowMarkers(true);
    setShowValues(true);
    setShowAverage(false);
  }

  const sourceUrl =
    lang === "fr"
      ? "https://www150.statcan.gc.ca/t1/tbl1/fr/tv.action?pid=1810024501"
      : "https://www150.statcan.gc.ca/t1/tbl1/en/tv.action?pid=1810024501";

  return (
    <div className="app" lang={lang}>
      <a className="skip-link" href="#main">
        {t.skip}
      </a>

      <Navbar expand="md" className="topbar">
        <Container>
          <Navbar.Brand href="#overview" className="brand">
            <span className="brand-mark" aria-hidden="true">
              P
            </span>
            <span>
              Produce <b>Pulse</b>
            </span>
          </Navbar.Brand>

          <Navbar.Toggle aria-controls="main-nav" />

          <Navbar.Collapse id="main-nav">
            <Nav className="mx-auto">
              <Nav.Link href="#overview">{t.navOverview}</Nav.Link>
              <Nav.Link href="#trends">{t.navTrends}</Nav.Link>
              <Nav.Link href="#compare">{t.navCompare}</Nav.Link>
            </Nav>

            <Button
              variant="outline-dark"
              className="language-button"
              onClick={changeLanguage}
              aria-label={t.languageAria}
            >
              <span aria-hidden="true">◎</span> {t.language}
            </Button>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <main id="main">
        <section className="hero-section" id="overview">
          <Container>
            <Row className="align-items-end g-4">
              <Col lg={8}>
                <div className="eyebrow">{t.eyebrow}</div>
                <h1>{t.title}</h1>
                <p className="hero-copy">{t.intro}</p>
              </Col>

              <Col lg={4} className="hero-meta">
                <Badge bg="light" text="dark" className="data-badge">
                  ● {t.sourceBadge}
                </Badge>
                <p>{t.sourceNote}</p>
                <small>
                  {t.updated}: <b>{t.updatedDate}</b>
                </small>
              </Col>
            </Row>

            <div className="global-filter-panel" aria-labelledby="filter-title">
              <div className="filter-intro">
                <div>
                  <h2 id="filter-title">{t.filtersTitle}</h2>
                  <p>{t.filtersBody}</p>
                </div>
              </div>

              <div className="global-controls">
                <Form.Group>
                  <Form.Label>{t.currency}</Form.Label>
                  <Form.Select
                    value={currency}
                    onChange={(event) => setCurrency(event.target.value)}
                  >
                    <option value="CAD">CAD ($)</option>
                    <option value="USD">USD ($)</option>
                    <option value="EUR">EUR (€)</option>
                  </Form.Select>
                </Form.Group>

                <Form.Group>
                  <Form.Label>{t.unit}</Form.Label>
                  <ButtonGroup className="unit-toggle" aria-label={t.unit}>
                    {["kg", "lb"].map((unitOption) => (
                      <Button
                        key={unitOption}
                        variant={unit === unitOption ? "dark" : "outline-dark"}
                        onClick={() => setUnit(unitOption)}
                        aria-pressed={unit === unitOption}
                      >
                        {unitOption}
                      </Button>
                    ))}
                  </ButtonGroup>
                </Form.Group>

                <Button
                  variant="link"
                  className="reset-button"
                  onClick={resetFilters}
                >
                  ↻ {t.resetFilters}
                </Button>
              </div>

              <small className="rate-note">{t.rateNote}</small>
            </div>
          </Container>
        </section>

        <section className="metrics-section" aria-label={t.navOverview}>
          <Container>
            <Row className="g-3">
              <Col md={4}>
                <Card className="metric-card">
                  <Card.Body>
                    <span>{t.avgPrice}</span>
                    <strong>{displayPrice(averageDecemberPrice)}</strong>
                    <small>
                      {t.acrossFoods} · {unit === "kg" ? t.kg : t.lb}
                    </small>
                  </Card.Body>
                </Card>
              </Col>

              <Col md={4}>
                <Card className="metric-card">
                  <Card.Body>
                    <span>{t.biggestRise}</span>
                    <strong className="positive">
                      +
                      {biggestIncrease.change.toLocaleString(locale, {
                        maximumFractionDigits: 1,
                      })}
                      %
                    </strong>
                    <small>
                      {t.foods[biggestIncrease.key]} · {t.fromJan}
                    </small>
                  </Card.Body>
                </Card>
              </Col>

              <Col md={4}>
                <Card className="metric-card">
                  <Card.Body>
                    <span>{t.lowestNow}</span>
                    <strong>
                      {displayPrice(DATA[lowestDecemberFood][11])}
                    </strong>
                    <small>
                      {t.foods[lowestDecemberFood]} ·{" "}
                      {unit === "kg" ? t.kg : t.lb}
                    </small>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          </Container>
        </section>

        <section className="dashboard-section" id="trends">
          <Container>
            <Card className="chart-card">
              <Card.Body>
                <Row className="chart-heading g-4">
                  <Col lg={5}>
                    <div className="eyebrow">01 · {t.lineKicker}</div>
                    <h2>{t.lineTitle}</h2>
                    <p>{t.lineBody}</p>
                  </Col>

                  <Col lg={7}>
                    <div className="controls-panel line-controls">
                      <Form.Group>
                        <Form.Label>{t.chooseFood}</Form.Label>
                        <Form.Select value={food} onChange={changeMainFood}>
                          {FOOD_KEYS.map((foodKey) => (
                            <option key={foodKey} value={foodKey}>
                              {t.foods[foodKey]}
                            </option>
                          ))}
                        </Form.Select>
                      </Form.Group>

                      <Form.Group>
                        <Form.Label>{t.period}</Form.Label>
                        <Form.Select
                          value={period}
                          onChange={(event) => setPeriod(event.target.value)}
                        >
                          <option value="year">{t.fullYear}</option>
                          <option value="first">{t.firstHalf}</option>
                          <option value="second">{t.secondHalf}</option>
                        </Form.Select>
                      </Form.Group>

                      <Form.Group>
                        <Form.Label>{t.compareFood}</Form.Label>
                        <Form.Select
                          value={comparisonFood}
                          onChange={(event) =>
                            setComparisonFood(event.target.value)
                          }
                        >
                          <option value="none">{t.noComparison}</option>
                          {FOOD_KEYS.filter((foodKey) => foodKey !== food).map(
                            (foodKey) => (
                              <option key={foodKey} value={foodKey}>
                                {t.foods[foodKey]}
                              </option>
                            ),
                          )}
                        </Form.Select>
                      </Form.Group>

                      <div className="chart-options">
                        <Form.Check
                          type="switch"
                          id="show-markers"
                          label={t.showMarkers}
                          checked={showMarkers}
                          onChange={(event) =>
                            setShowMarkers(event.target.checked)
                          }
                        />
                      </div>
                    </div>
                  </Col>
                </Row>

                <LineChart
                  values={selectedValues}
                  comparisonValues={comparisonValues}
                  monthIndices={monthIndices}
                  food={food}
                  comparisonFood={comparisonFood}
                  color={COLORS[food]}
                  lang={lang}
                  unit={unit}
                  currency={currency}
                  showMarkers={showMarkers}
                  t={t}
                />

                <p className="interaction-note">
                  ⓘ {showMarkers ? t.chartNote : t.markersOffNote}
                </p>
              </Card.Body>
            </Card>
          </Container>
        </section>

        <section className="dashboard-section alt" id="compare">
          <Container>
            <Card className="chart-card">
              <Card.Body>
                <Row className="chart-heading g-4">
                  <Col lg={5}>
                    <div className="eyebrow">02 · {t.barKicker}</div>
                    <h2>{t.barTitle}</h2>
                    <p>{t.barBody}</p>
                  </Col>

                  <Col lg={7}>
                    <div className="controls-panel compare-controls">
                      <Form.Group>
                        <Form.Label>{t.chooseMonth}</Form.Label>
                        <Form.Select
                          value={month}
                          onChange={(event) =>
                            setMonth(Number(event.target.value))
                          }
                        >
                          {MONTH_KEYS.map((monthKey, monthIndex) => (
                            <option key={monthKey} value={monthIndex}>
                              {t[monthKey]}
                            </option>
                          ))}
                        </Form.Select>
                      </Form.Group>

                      <Form.Group>
                        <Form.Label>{t.itemsShown}</Form.Label>
                        <Form.Select
                          value={itemCount}
                          onChange={(event) => setItemCount(event.target.value)}
                        >
                          <option value="all">{t.allItems}</option>
                          <option value="three">{t.threeItems}</option>
                        </Form.Select>
                      </Form.Group>

                      <Form.Group>
                        <Form.Label>{t.sortBy}</Form.Label>
                        <Form.Select
                          value={sortOrder}
                          onChange={(event) => setSortOrder(event.target.value)}
                        >
                          <option value="high">{t.highLow}</option>
                          <option value="low">{t.lowHigh}</option>
                          <option value="name">{t.alphabetical}</option>
                        </Form.Select>
                      </Form.Group>

                      <div className="chart-options bar-options">
                        <Form.Check
                          type="switch"
                          id="show-values"
                          label={t.showValues}
                          checked={showValues}
                          onChange={(event) =>
                            setShowValues(event.target.checked)
                          }
                        />
                        <Form.Check
                          type="switch"
                          id="show-average"
                          label={t.showAverage}
                          checked={showAverage}
                          onChange={(event) =>
                            setShowAverage(event.target.checked)
                          }
                        />
                      </div>
                    </div>
                  </Col>
                </Row>

                <BarChart
                  month={month}
                  items={displayedItems}
                  lang={lang}
                  unit={unit}
                  currency={currency}
                  showValues={showValues}
                  showAverage={showAverage}
                  t={t}
                />

                <div className="insight-box">
                  <span aria-hidden="true">↗</span>
                  <p>
                    <b>{t.insight}</b>
                    {t.barInsight(
                      t.foods[highestItem.key],
                      t.foods[lowestItem.key],
                      displayPrice(highestItem.value - lowestItem.value),
                    )}
                  </p>
                </div>
              </Card.Body>
            </Card>
          </Container>
        </section>

        <section className="method-section">
          <Container>
            <Row>
              <Col lg={{ span: 8, offset: 2 }}>
                <div className="method-box">
                  <div className="method-icon" aria-hidden="true">
                    i
                  </div>
                  <div>
                    <h2>{t.methodology}</h2>
                    <p>{t.methodText}</p>
                    <div className="method-links">
                      <a href={sourceUrl} target="_blank" rel="noreferrer">
                        ↗ {t.sourceLabel}
                      </a>
                      <a
                        href={priceCsvUrl}
                        download="canada-produce-prices-2025.csv"
                      >
                        ↓ {t.downloadLabel}
                      </a>
                    </div>
                  </div>
                </div>
              </Col>
            </Row>
          </Container>
        </section>
      </main>

      <footer>
        <Container>
          <span>{t.footer}</span>
          <a href="#overview">↑ {t.navOverview}</a>
        </Container>
      </footer>
    </div>
  );
}

export default App;
