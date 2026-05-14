import { NextRequest, NextResponse } from 'next/server'
import { getOrder } from '@/lib/medusa'

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const token = req.headers.get('authorization')?.replace('Bearer ', '')
  if (!token) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }
  try {
    const data = await getOrder(params.id, token)
    return NextResponse.json(data)
  } catch (err) {
    return NextResponse.json({ error: 'Order not found' }, { status: 404 })
  }
}
