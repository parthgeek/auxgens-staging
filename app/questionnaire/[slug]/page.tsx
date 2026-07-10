import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Announce from "../../components/Announce";
import Footer from "../../components/Footer";
import Nav from "../../components/Nav";
import ScrollFade from "../../components/ScrollFade";
import {
  getQuestionnaire,
  questionnaires,
} from "../../data/questionnaires";
import QuestionnaireClient from "./QuestionnaireClient";

type PageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export function generateStaticParams() {
  return questionnaires.map((questionnaire) => ({
    slug: questionnaire.slug,
  }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const questionnaire = getQuestionnaire(slug);

  if (!questionnaire) {
    return {
      title: "Questionnaire | Auxgens",
    };
  }

  return {
    title: `${questionnaire.framework} Questionnaire | Auxgens`,
    description: questionnaire.description,
  };
}

export default async function FrameworkQuestionnairePage({
  params,
}: PageProps) {
  const { slug } = await params;
  const questionnaire = getQuestionnaire(slug);

  if (!questionnaire) {
    notFound();
  }

  return (
    <>
      <Nav />
      <Announce />
      <main>
        <QuestionnaireClient questionnaire={questionnaire} />
      </main>
      <Footer />
      <ScrollFade />
    </>
  );
}
