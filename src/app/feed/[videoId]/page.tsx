interface PageProps {
  params: Promise<{ videoId: string }>;
}

const Page =async ({ params }: PageProps) => {
    console.log("where it is logged");
    
    const { videoId } =await params;
  return (
    <div>
    Video Id Page:{videoId}!!
    </div>
    );
};
export default Page;
