import React, { useState } from 'react';
import Layout from '@components/layout/layout';
import Container from '@components/ui/container';
import PageHeroSection from '@components/ui/page-hero-section';
import DownloadApps from '@components/common/download-apps';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { GetStaticProps } from 'next';
import Accordion from '@components/ui/accordion';
import { faq } from '@settings/faq-settings';
import Seo from '@components/seo/seo';
import { getLayout } from '@components/layout/layout-five';

export default function TermsPage() {
  return (
    <>
      <Seo
        title="FAQ"
        description="Organic, natural, Products in Dhaka Bangladesh | Organic Online Sale store in Bangladesh."
        path="faq"
      />
      <PageHeroSection heroTitle="text-page-faq" className="faq-banner-area" />
      <Container>
        <div className="flex flex-col max-w-2xl py-12 mx-auto 2xl:max-w-4xl md:py-20">
          {faq?.map((item, index) => (
            <Accordion
              key={`${item.title}-${index}`}
              item={item}
              translatorNS="faq"
            />
          ))}
        </div>
      </Container>
      <DownloadApps />
    </>
  );
}

TermsPage.getLayout = getLayout;

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale!, [
        'common',
        'forms',
        'menu',
        'faq',
        'footer',
      ])),
    },
  };
};
