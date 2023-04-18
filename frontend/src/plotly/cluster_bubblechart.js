
const Plotly = window.Plotly;

const clusterColor = (n) => {
    const clusters = {
        'tumor cells': 'rgba(255, 0, 0, 1)',
        'tumor stroma mix': 'rgba(250, 3, 215, 1)',
        'tumor stroma immune mix': 'rgba(153, 0, 255,1)',
        'stroma close to tumor': 'rgba(46, 255, 141, 1)',
        'stroma far from tumor': 'rgba(0, 255, 255, 1)',
        'adipocytes': 'rgba(253, 255, 0, 1)',
    }

    return n in clusters  ? clusters[n] : 'rgba(158, 155, 155, 0.5)'
}

const exprColor = (n) => {
    console.log(n)
}

const numGenesSize = (n) => {
    if (n <= 2000) {
        return 6
    }
    if (n > 2000 && n < 3000) {
        return 8
    }
    if (n >= 3000) {
        return 12
    }
}

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
  }
  
export const generateBubbleChartByCluster = ({
    backgroundOpacity,
    clusters,
    expression,
    graphOpacity,
    sample,
    sampleMeta,
    showGeneClusters,
    // clusterGeneInput,
    // trackData,
}) => {
    let x = []
    let y = []
    let hovertemplate = []
    let color = []
    let size = []
    let test = []

    const expressionObj = Object.fromEntries(expression)

    if (!showGeneClusters) {
        Object.entries(sampleMeta).forEach(([barcode, o]) => {
            if (o.cluster && clusters[o.cluster] && clusters[o.cluster].show) {
                size.push(12)
                x.push(o.x)
                y.push(o.y)
                color.push(clusters[o.cluster].color)
                hovertemplate.push(
                    `Barcode: ${barcode}
                    <br>Cluster: ${o.cluster}
                    <br>
                    <extra></extra>
                    `
                )
            }
        })
    } else {
        Object.entries(sampleMeta).forEach(([barcode, o]) => {
            if (o.cluster && clusters[o.cluster].show) {
                const clusterGene = clusters[o.cluster].gene
                if (clusterGene) { // Add and show gene 
                    let expr = expressionObj[clusterGene][barcode]
                    let arr = Object.values(expressionObj[clusterGene])
                    let max = Math.max(...arr)
                    let sizeVal = expr / max * 20
                    
                    if (sizeVal > 0) {
                        if (sizeVal < 6) {
                            size.push(6)
                        } else {
                            size.push(sizeVal)
                        }
                        x.push(o.x)
                        y.push(o.y)
                        color.push(clusters[o.cluster].color)
                        hovertemplate.push(
                            `Barcode: ${barcode}
                            <br>Cluster: ${o.cluster}
                            <br>Gene: ${clusterGene}
                            <br>Read count: ${expr}
                            <br>
                            <extra></extra>
                            `
                        )
                    }
                }
            }
        })
    }

    const marker = {
        color,
            // color: geneObj.map(s => `rgba(255, 165, 0, ${s.opacity})`), // Gene expr
        opacity:  graphOpacity/100,
        size,
        symbol: 'circle',
        line: {
            width: 0,
            // color: geneObj.map(s => clusterColor(s.tissue)),
        }
    }

    let trace1 = {
        x,
        y,
        hovertemplate,
        mode: 'markers',
        type: 'scatter',
        marker,
    }
    
    let data = [
        trace1
    ]

    let layout = {
        title: `Sample ${sample}`,
        showlegend: false,
        height: 700,
        width: 700,
        margin: {
            l: 50,
            r: 100,
            b: 20,
            t: 100,
            pad: 4
          },
        xaxis: {
            range: [0, 33]  // to set the xaxis range to 0 to 1
        },
        yaxis: {
            range: [0, 35]  // to set the xaxis range to 0 to 1
        },
        images: [
            {
                // "source": `https://calina01.u.hpc.mssm.edu/spatial_transcriptomics/images/Sample${sample}`,
                "source": `Sample${sample}.jpg`,
                "xref": "x",
                "yref": "y",
                "x": 1.5,
                "y": 1.5,
                "xanchor":  "left",
                "yanchor": "bottom",
                "sizex": 33 - 2,
                "sizey": 35 - 2,
                "sizing": "stretch",
                "opacity": backgroundOpacity/100,
                "layer": "below"
              },
          ],
    };

    if (x.length > 0) {
        Plotly.newPlot('he-scatterplot', data, layout);
    }

    return document.getElementById('he-scatteplot')
}