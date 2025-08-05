// function aggregateToXDays(data, X) {
//     let aggregatedData = [];
//     let sumObj = {}; // Object to accumulate sums

//     data.forEach((d, index) => {
//         // Iterate over keys, excluding 'date', 'dayOfYear', and 'year'
//         Object.keys(d).forEach(key => {
//             if (!["date", "dayOfYear", "year"].includes(key)) {
//                 sumObj[key] = (sumObj[key] || 0) + (isNaN(d[key]) ? 0 : d[key]);
//             }
//         });

//         // Keep only the Xth, 2Xth, ... timestamps
//         if ((index + 1) % X === 0 || index === data.length - 1) {
//             aggregatedData.push({
//                 date: d.date,  // Keep the Xth timestamp
//                 dayOfYear: d.dayOfYear,
//                 year: d.year,
//                 ...sumObj      // Spread accumulated sums
//             });
//             sumObj = {}; // Reset sum accumulator
//         }
//     });

//     return aggregatedData;
// }