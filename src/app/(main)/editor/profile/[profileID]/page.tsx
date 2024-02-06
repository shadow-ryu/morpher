import React from "react";

interface PageProps {
  params: {
    slug: string;
  };
}
const Page = async ({ params }: PageProps) => {
  const { slug } = params;
  return <div>page</div>;
};

export default Page;
