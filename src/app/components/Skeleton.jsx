const Skeleton = () => {
  return (
    <div className="w-full flex flex-col gap-4 animate-pulse">
      <div className="h-12 rounded-lg bg-bk-3"></div>
      <div className="space-y-3">
        {[...Array(2)].map((_, index) => (
          <div key={index} className="h-12 rounded-lg bg-bk-3" />
        ))}
      </div>
    </div>
  )
}

export default Skeleton
