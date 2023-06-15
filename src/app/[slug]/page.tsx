import { getAllPaths, getFile, sluggify } from "@/content/getData";
import ConceptsBoxWrapper, {
  ConceptsBox,
} from "@/modules/Concepts/ConceptsBox";
import ConceptsExampleWrapper, {
  ConceptsExample,
} from "@/modules/Concepts/ConceptsExample";
import { MDXRemote } from "next-mdx-remote/rsc";

export default async function Page({ params }: { params: { slug: string } }) {
  const data = await getFile(params.slug);

  if (!data) {
    return <p>Page not found</p>;
  }

  return (
    /* @ts-expect-error Server Component */
    <MDXRemote
      source={data.content}
      components={{
        h2: (data) => (
          <h2 id={sluggify(data.children?.toString())}>{data.children}</h2>
        ),
        ConceptsBoxWrapper: ConceptsBoxWrapper,
        ConceptsBox: ConceptsBox,
        ConceptsExampleWrapper: ConceptsExampleWrapper,
        ConceptsExample: ConceptsExample,
      }}
    />
  );
}

export async function generateStaticParams() {
  const paths = getAllPaths();

  return paths.map((item) => ({
    slug: item.route,
  }));
}
