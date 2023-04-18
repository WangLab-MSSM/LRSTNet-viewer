export default function generateTrackGroup({
    samples,
    geneData,
    gene,
    i,
}) {
    const values = Object.values(geneData).map(el => el.read_count)
    return {
        x: [...samples],
        y: [gene],
        z: [ 
            [...samples.map(sample => geneData[sample].read_count)]
        ],
        type: 'heatmap',
        connectgaps: false,
        hoverongaps: false,
        colorscale: [
            [0.0, '#0000FF'],
            [1.0, '#FF0000']
        ],
        autocolorscale: true,
        showscale: i === 0,
        zmin: -3,
        zmax: 3,
        colorbar: {
            title: '<b>z-score</b>',
            xref: 'paper',
            yref: 'paper',
            x: 1.01,
            y: 0.5,
            thickness: 10,
            side: 'bottom',
            len: 220,
            lenmode: 'pixels',
        }
    }
}