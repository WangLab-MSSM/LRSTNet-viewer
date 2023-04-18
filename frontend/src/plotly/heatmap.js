import { generateLayout } from "./generateLayout";

import arr from './arr-stats'

import _ from 'lodash'

export const generateHeatmap = ({
  barcodes,
  clusters,
  expression,
  sampleMeta,
}) => {
  const Plotly = window.Plotly
  if (Object.keys(sampleMeta).length === 0) { return null }

  const expressionObj = Object.fromEntries(expression)
  let x = barcodes.filter(s => sampleMeta[s].cluster && clusters[sampleMeta[s].cluster] && clusters[sampleMeta[s].cluster].show )
  let y = Object.keys(expressionObj)
  let raw_z = y.map(gene => x.map(barcode => expressionObj[gene] && expressionObj[gene][barcode] > 0 ? expressionObj[gene][barcode] : 'NA'))
  const unnormalized = [...raw_z].map(z => z.filter(score => !_.isString(score) && score > -Infinity))

  const z_scores = unnormalized.map(z => arr.zScores(z))
  const z_score_dict = unnormalized.map((z, j) => Object.fromEntries(z.map((v, i) => [v, z_scores[j][i]])))
  const z = raw_z.map((z, i) => z.map(score => {
    if (score in z_score_dict[i]) {
      return z_score_dict[i][score]
    } else {
        return ''
    }
  }))

  let data = [
    {
      z,
      x,
      y,
      type: 'heatmap',
      hoverongaps: true,
      zmax: 3,
      zmin: -3,
      colorscale:  [
        [0.0, '#002CFE'],
        [1.0, '#FFFF00'],
      ],
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
  ]

  const categoryVals = Object.fromEntries(Object.keys(clusters).map((cluster, i) => [cluster, {value: i+1, color: clusters[cluster].color}]))
  const values = Array.from(Object.keys(clusters).keys()).map(el => el+1)
  let clusterTrace = {
    x,
    y: ['Cluster'],
    z: [x.map(sample => sampleMeta[sample].cluster ? categoryVals[sampleMeta[sample].cluster].value : '')],
    type: "heatmap",
    colorscale: Object
      .entries(categoryVals)
      .map(([, vals], i) => {
          const opts = Object.keys(categoryVals).length - 1
          return [i/opts, vals.color]     
      }),
    connectgaps: false,
    hoverongaps: false,
    autocolorscale: false,
    showscale: false,
    hovertemplate: "Sample: %{x}<br>%{y}<br><extra></extra>",
    zmin: Math.min(...values),
    zmax: Math.max(...values),
  }

  data.push(clusterTrace)

  // need this for some mysterious reason
  data.forEach((track) => {
        if (track) {
            track.z.splice(0,0,[])
            track.y.splice(0,0,'')
        }
  })

  const layout = generateLayout(data)
  Plotly.newPlot('plotly-heatmap', data, layout);

  return document.getElementById('plotly-heatmap')
}