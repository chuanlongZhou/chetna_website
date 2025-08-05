// Vanilla JavaScript CSV parser
function parseCSV(text) {
    const lines = text.trim().split('\n');
    const headers = lines[0].split(',').map(h => h.trim());
    const data = [];
    
    for (let i = 1; i < lines.length; i++) {
        const values = lines[i].split(',').map(v => v.trim());
        const row = {};
        headers.forEach((header, index) => {
            row[header] = values[index] || '';
        });
        data.push(row);
    }
    
    return data;
}

async function fetch_ts_Data(url, cols, unit) {
    const response = await fetch(url);
    const text = await response.text();
    const data = parseCSV(text);

    let yearAvailable = [...new Set(data.map(d => d.date.substring(0, 4)))];
    // convert to integer
    yearAvailable = yearAvailable.map(y => parseInt(y));

    // Convert values from tonnes to megatonnes (Mt) and round to 2 decimals
    const convertToUnit = (value) => {
        if (unit === "Mt") return (parseFloat(value) / 1_000_000).toFixed(2);
        if (unit === "t") return (parseFloat(value) * 1_000).toFixed(2);
        return parseFloat(value).toFixed(2);
    };

    let rawData = data.map((row) => ({
        date: row.date,
        year: row.date.substring(0, 4),
        ...Object.fromEntries(
            cols.map((key) => [key, parseFloat(convertToUnit(row[key]))])
        ),
    }));
    return [rawData, yearAvailable];
}


async function loadMapData(city, columnName) {
    const geojsonURL = `https://raw.githubusercontent.com/chuanlongZhou/indian_100_data/main/data/city/city_grid/${city}.geojson`;
    const csvURL = `https://raw.githubusercontent.com/chuanlongZhou/indian_100_data/main/data/summary_grid/${city}.csv`;
  
    const [geojsonResponse, csvResponse] = await Promise.all([
      fetch(geojsonURL),
      fetch(csvURL)
    ]);
    
    const [geojson, csvText] = await Promise.all([
      geojsonResponse.json(),
      csvResponse.text()
    ]);
  
    const rows = csvText.trim().split('\n');
    const headers = rows[0].split(',');
    const colIndex = headers.indexOf(columnName);
    const idIndex = headers.indexOf('index');
  
    if (colIndex === -1 || idIndex === -1) {
      throw new Error(`Missing column: ${columnName} or index`);
    }
  
    const dataMap = new Map();
    for (let i = 1; i < rows.length; i++) {
      const cells = rows[i].split(',');
      const id = cells[idIndex];
      const value = parseFloat(cells[colIndex]);
      if (id && !isNaN(value)) {
        dataMap.set(id, value);
      }
    }
  
    // Inject 'name' field into each feature
    geojson.features.forEach(f => {
      const id = f.properties.index || f.properties.id;
      f.properties.name = id; // REQUIRED by ECharts
    });
  
    const data = geojson.features.map(f => {
      const id = f.properties.name;
      return {
        name: id,
        value: dataMap.get(id) ?? 0
      };
    });
  
    return { geojson, data };
  }

  
export { fetch_ts_Data, loadMapData};