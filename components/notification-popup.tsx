"use client"

import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { AudioWaveformIcon as Waveform } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function NotificationPopup() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          size="icon"
          className="fixed bottom-6 right-6 rounded-full bg-orange-600 text-white hover:bg-orange-700"
        >
          <Waveform className="h-6 w-6" />
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="w-full sm:w-96 flex flex-col space-y-4 pt-10">
        <h2 className="text-xl font-semibold">Notifications</h2>
        <p className="text-sm text-neutral-500">No notifications yet – chat coming soon!</p>
      </SheetContent>
    </Sheet>
  )
}
