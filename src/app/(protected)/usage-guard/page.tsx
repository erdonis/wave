export default async function Page() {
  return (
    <div className="px-4 pt-4">
      <div className="rounded-2xl bg-card px-4 shadow sm:px-8">
        <div className="flex items-center justify-between pt-4 sm:pt-5">
          <p className="text-2xl">You have reached the usage cap for today!</p>
        </div>
      </div>
    </div>
  );
}
