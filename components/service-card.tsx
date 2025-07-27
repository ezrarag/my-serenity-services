interface Service {
  id: number
  title: string
  subtitle: string
  img: string
}

export default function ServiceCard({
  svc,
  size = "md",
}: {
  svc: Service
  size?: "md" | "lg"
}) {
  const dimension = size === "lg" ? "w-60 h-60 sm:w-72 sm:h-72" : "w-36 h-36"
  return (
    <div className={`rounded-full overflow-hidden border-4 border-primary bg-white shadow-md ${dimension}`}>
      {/* animated / placeholder svg */}
      <img src={svc.img || "/placeholder.svg"} alt={svc.title} className="object-cover w-full h-full" />
    </div>
  )
}
