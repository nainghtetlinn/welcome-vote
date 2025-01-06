'use client'

import { Bar, BarChart, XAxis, YAxis } from 'recharts'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart'

import { Tables } from '@/types/supabase'

type TResult = Tables<'voting_results'>

const chartConfig = {
  first: {
    color: 'hsl(var(--chart-1))',
  },
  second: {
    color: 'hsl(var(--chart-2))',
  },
  third: {
    color: 'hsl(var(--chart-3))',
  },
  fourth: {
    color: 'hsl(var(--chart-4))',
  },
  fifth: {
    color: 'hsl(var(--chart-5))',
  },
} satisfies ChartConfig

const colors = [
  'var(--color-first)',
  'var(--color-second)',
  'var(--color-third)',
  'var(--color-fourth)',
  'var(--color-fifth)',
]

const ResultChart = ({
  title,
  candidates,
}: {
  title: string
  candidates: TResult[]
}) => {
  const formatted = candidates.map((c, i) => ({
    ...c,
    fill: colors[i],
  }))

  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart
            accessibilityLayer
            data={formatted}
            layout='vertical'
          >
            <YAxis
              dataKey='name'
              type='category'
              tickLine={false}
              axisLine={false}
            />
            <XAxis
              dataKey='votes_count'
              type='number'
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Bar
              dataKey='votes_count'
              layout='vertical'
              radius={5}
            />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}

export default ResultChart
