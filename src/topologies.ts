export type Kind = 'ext' | 'main' | 'alt'

export type TNode = { x: number; y: number; w: number; h: number; t: string; s?: string[]; k: Kind }
export type TEdge = [number, number][]
export type Topology = {
  h: number
  summary: string
  container?: { x: number; y: number; w: number; h: number; label: string; lx?: number }
  lanes?: { x: number; y: number; label: string }[]
  nodes: TNode[]
  edges: TEdge[]
  legend: [Kind, string][]
}

export const topologies: Record<string, Topology> = {
  telemetry: {
    h: 376,
    summary:
      'Players and partner systems use the gaming platform. Its events enter AWS through a storefront and API Gateway, flow through Kinesis and Lambda into OpenSearch, and are charted in Grafana. A latency QA tool feeds OpenSearch and a security-first data catalog sits alongside.',
    container: { x: 184, y: 36, w: 472, h: 324, label: 'AWS' },
    nodes: [
      { x: 24, y: 36, w: 140, h: 44, t: 'Players', k: 'ext' },
      { x: 24, y: 116, w: 140, h: 44, t: 'Gaming platform', k: 'ext' },
      { x: 24, y: 196, w: 140, h: 44, t: 'Partner systems', k: 'ext' },
      { x: 196, y: 112, w: 124, h: 52, t: 'AWS storefront', s: ['Entry point'], k: 'main' },
      { x: 348, y: 112, w: 124, h: 52, t: 'API Gateway', s: ['Front door'], k: 'main' },
      { x: 500, y: 112, w: 124, h: 52, t: 'Kinesis', s: ['Event stream'], k: 'main' },
      { x: 500, y: 200, w: 124, h: 52, t: 'Lambda', s: ['Processing'], k: 'main' },
      { x: 348, y: 200, w: 124, h: 52, t: 'OpenSearch', s: ['ELK stack'], k: 'main' },
      { x: 196, y: 200, w: 124, h: 52, t: 'Grafana', s: ['Dashboards'], k: 'main' },
      { x: 196, y: 288, w: 124, h: 52, t: 'Data catalog', s: ['Security-first'], k: 'alt' },
      { x: 348, y: 288, w: 124, h: 52, t: 'Latency QA', s: ['Python + C++'], k: 'alt' },
    ],
    edges: [
      [[94, 82], [94, 112]],
      [[94, 194], [94, 164]],
      [[166, 138], [194, 138]],
      [[322, 138], [346, 138]],
      [[474, 138], [498, 138]],
      [[562, 166], [562, 198]],
      [[498, 226], [474, 226]],
      [[346, 226], [322, 226]],
      [[410, 286], [410, 254]],
    ],
    legend: [['ext', 'Outside systems'], ['main', 'Telemetry pipeline'], ['alt', 'Supporting tools']],
  },

  maas: {
    h: 372,
    summary:
      'Two lanes feed Grafana. Gaming user activity logs flow from the gaming platform through S3, Logstash and Elasticsearch, while infrastructure metrics flow through Prometheus. Grafana alerts lead to runbooks, ServiceNow incidents and application support teams, all defined as code with Concourse.',
    container: { x: 10, y: 24, w: 656, h: 332, label: 'Defined as code with Concourse', lx: 28 },
    lanes: [
      { x: 24, y: 86, label: 'Gaming user activity logs' },
      { x: 24, y: 170, label: 'Infrastructure logs' },
    ],
    nodes: [
      { x: 24, y: 96, w: 124, h: 48, t: 'Gaming platform', s: ['User activity'], k: 'ext' },
      { x: 172, y: 96, w: 80, h: 48, t: 'AWS S3', s: ['Log storage'], k: 'main' },
      { x: 276, y: 96, w: 100, h: 48, t: 'Logstash', s: ['Pipeline'], k: 'main' },
      { x: 400, y: 96, w: 130, h: 48, t: 'Elasticsearch', s: ['Search index'], k: 'main' },
      { x: 24, y: 180, w: 124, h: 48, t: 'Infrastructure', s: ['Hosts, services'], k: 'ext' },
      { x: 172, y: 180, w: 120, h: 48, t: 'Prometheus', s: ['Metrics'], k: 'main' },
      { x: 556, y: 96, w: 94, h: 132, t: 'Grafana', s: ['Dashboards'], k: 'main' },
      { x: 556, y: 276, w: 94, h: 48, t: 'Alerts', s: ['Grafana rules'], k: 'alt' },
      { x: 410, y: 276, w: 122, h: 48, t: 'Runbooks', s: ['Response steps'], k: 'alt' },
      { x: 264, y: 276, w: 122, h: 48, t: 'ServiceNow', s: ['Incidents'], k: 'alt' },
      { x: 118, y: 276, w: 122, h: 48, t: 'App support', s: ['Onboarded teams'], k: 'ext' },
    ],
    edges: [
      [[150, 120], [170, 120]],
      [[254, 120], [274, 120]],
      [[378, 120], [398, 120]],
      [[532, 120], [554, 120]],
      [[150, 204], [170, 204]],
      [[294, 204], [554, 204]],
      [[603, 230], [603, 274]],
      [[554, 300], [534, 300]],
      [[408, 300], [388, 300]],
      [[262, 300], [242, 300]],
    ],
    legend: [['ext', 'Sources and teams'], ['main', 'Collect and visualize'], ['alt', 'Alert response']],
  },

  bopis: {
    h: 304,
    summary:
      'Shoppers use the Xfinity.com portals (Self-Service, Omni, XOE, X1). The portals call API Gateway, SNS and a scheduled Python Lambda on AWS to reach store pickup, while the core order flow stays separate.',
    container: { x: 204, y: 36, w: 452, h: 244, label: 'AWS' },
    nodes: [
      { x: 24, y: 30, w: 160, h: 44, t: 'Shopper', k: 'ext' },
      { x: 24, y: 108, w: 160, h: 64, t: 'Xfinity portals', s: ['Self-Service, Omni,', 'XOE, X1'], k: 'ext' },
      { x: 24, y: 206, w: 160, h: 52, t: 'Core order flow', s: ['Kept separate'], k: 'ext' },
      { x: 216, y: 114, w: 124, h: 52, t: 'API Gateway', s: ['Entry point'], k: 'main' },
      { x: 368, y: 114, w: 124, h: 52, t: 'SNS', s: ['Events'], k: 'main' },
      { x: 520, y: 114, w: 124, h: 52, t: 'Lambda', s: ['Scheduled, Python'], k: 'main' },
      { x: 520, y: 200, w: 124, h: 52, t: 'Store pickup', s: ['Fulfillment'], k: 'ext' },
    ],
    edges: [
      [[104, 76], [104, 106]],
      [[104, 174], [104, 204]],
      [[186, 140], [214, 140]],
      [[342, 140], [366, 140]],
      [[494, 140], [518, 140]],
      [[582, 168], [582, 198]],
    ],
    legend: [['ext', 'Existing systems'], ['main', 'New serverless path']],
  },

  'custom-events': {
    h: 212,
    summary:
      'Visitors use the client site. Custom JavaScript events send on-page signals to the Quantum Metric platform, which feeds dashboards. Issues are priced in dollars so clients can prioritize fixes.',
    nodes: [
      { x: 28, y: 36, w: 130, h: 52, t: 'Visitors', s: ['Real sessions'], k: 'ext' },
      { x: 182, y: 36, w: 130, h: 52, t: 'Client site', s: ['Enterprise brand'], k: 'ext' },
      { x: 336, y: 36, w: 130, h: 52, t: 'Custom events', s: ['JavaScript'], k: 'main' },
      { x: 490, y: 36, w: 130, h: 52, t: 'QM platform', s: ['Analytics'], k: 'main' },
      { x: 490, y: 124, w: 130, h: 52, t: 'Dashboards', s: ['Per client'], k: 'main' },
      { x: 336, y: 124, w: 130, h: 52, t: 'Issue cost', s: ['In dollars'], k: 'alt' },
      { x: 182, y: 124, w: 130, h: 52, t: 'Client fixes', s: ['Prioritized'], k: 'alt' },
    ],
    edges: [
      [[160, 62], [180, 62]],
      [[314, 62], [334, 62]],
      [[468, 62], [488, 62]],
      [[555, 90], [555, 122]],
      [[488, 150], [468, 150]],
      [[334, 150], [314, 150]],
    ],
    legend: [['ext', 'Client side'], ['main', 'Quantum Metric platform'], ['alt', 'Decision output']],
  },
}
