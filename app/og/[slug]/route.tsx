/* eslint-disable @next/next/no-img-element */
import { ImageResponse } from '@vercel/og'

export const runtime = 'edge'

interface Props {
  params: Promise<{ slug: string }>
}

// Simple title mapping for common posts (edge runtime can't access filesystem)
const titleMap: Record<string, string> = {
  'welcome': 'The Curious Path from Hangzhou to Hotel Revenue Optimization',
  'spaced-repetition-app': 'Spaced Repetition Learning Web Application',
  'steven-pressfield-trilogy-review': 'Steven Pressfield Trilogy Review',
  'when-nobody-leads-lead': 'When Nobody Leads, Lead',
  'dawn-to-destiny-how-early-mornings-shaped-my-life': 'Dawn to Destiny: How Early Mornings Shaped My Life',
  'the-24-hour-currency-redefining-time-waste-and-worth': 'The 24-Hour Currency: Redefining Time Waste and Worth',
  'a-reflection-on-richard-hammings-you-and-your-research-striving-for-greatness': 'A Reflection on Richard Hamming\'s "You and Your Research": Striving for Greatness',
  'you-and-your-research-by-richard-hamming': 'You and Your Research, by Richard Hamming',
  'grateful-for-every-moment-how-i-learned-to-enjoy-life-more': 'Grateful for Every Moment: How I Learned to Enjoy Life More',
  'about-being-disciplined': 'About Being Disciplined',
  'mastering-meta-learning-a-pathway-to-unleashing-your-learning-potential': 'Mastering Meta-Learning: A Pathway to Unleashing Your Learning Potential',
  'reading-more-each-day-a-simple-35-tool': 'Reading More Each Day: A Simple $35 Tool',
  'running-through-history-our-unforgettable-first-time-journey-through-europe': 'Running Through History: Our Unforgettable First-Time Journey Through Europe',
  'my-bitcoin-thesis-2022-part-1': 'My Bitcoin Thesis @2022 – Part 1',
  'the-bullwhip-effect': 'The Bullwhip Effect',
  'the-generalized-product-rule': 'The Generalized Product Rule',
  'hotel-revenue-management-taxonomy': 'Hotel revenue management for the transient segment: taxonomy-based research',
  'hotel-revenue-management-overbooking': 'Hotel revenue management: Benefits of simultaneous overbooking and allocation problem formulation in price optimization',
  'bid-price-network-revenue-management': 'An evaluation of the bid price and nested network revenue management allocation methods'
}

export async function GET(_: Request, { params }: Props) {
  const { slug } = await params
  const title = titleMap[slug] || 'Aysajan Eziz'
  
  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          padding: '80px',
          background: '#fff',
          fontSize: 54,
          fontFamily: 'ui-monospace, SFMono-Regular, "SF Mono", Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace',
        }}
      >
        <div style={{ fontWeight: 700, marginBottom: 24, lineHeight: 1.2 }}>
          {title}
        </div>
        <div style={{ fontSize: 28, color: '#555', fontWeight: 400 }}>
          aysajaneziz.com
        </div>
      </div>
    ),
    { width: 1200, height: 630 }
  )
}