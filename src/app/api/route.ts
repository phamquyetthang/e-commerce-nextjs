import { db } from '@/utils/firesbase'
import { addDoc, getDocs, collection } from 'firebase/firestore'
import { NextResponse } from 'next/server'

export const GET = async () => {
  await addDoc(collection(db, 'test'), {
    message: `Hello from client ${new Date()}`
  })
  const data = await getDocs(collection(db, 'test'))

  return NextResponse.json({
    data: data.docs[0].data()
  })
}