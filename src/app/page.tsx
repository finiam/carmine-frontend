import { getAllPaths, getFile } from "@/content/getData";
import ConceptsLayout from "@/modules/Concepts/ConceptsLayout";
import Greeting from "@/modules/Concepts/Greeting";
import { MDXRemote } from "next-mdx-remote/rsc";
import Image from "next/image";
import logo from "/falcone_logo.png";
import ConceptsTable from "@/modules/Concepts/ConceptsTable";

export default async function HomePage() {
  const data = await getFile("intro");
  const paths = getAllPaths();

  if (!data) {
    return <p>Page not found</p>;
  }

  return (
    <>
      <ConceptsLayout
        sidebar={
          <figure className="pt-20 w-fit mx-auto">
            <Image
              src={"/falcone_logo.png"}
              alt="Falcone logo"
              width={164}
              height={94}
            />
          </figure>
        }
      >
        <article className="flex flex-col gap-12 pt-5">
          <Greeting />
          <div className="concepts-article">
            {/* @ts-expect-error Server Component */}
            <MDXRemote source={data.content} />
          </div>
          <ConceptsTable paths={paths} />
        </article>
      </ConceptsLayout>
    </>
  );
}
