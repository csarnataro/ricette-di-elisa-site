/**
 * SEO component that queries for data with
 *  Gatsby's useStaticQuery React hook
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';

const metaDescription =
  'ACID Localization is a team of Italian freelance translators specialized in video games.';
const metaKeywords =
  'acid localization, localization, video games localization, videogames localization, i18n, i10n, ACID Localization, ACID, Localization';
const metaAuthor = 'ACID Localization - Engineering team';

const SEO = ({ siteTitle, pageName }) => {
  const pageTitle =
    pageName === '' || typeof pageName === 'undefined'
      ? siteTitle
      : `${siteTitle} | ${pageName}`;
  return (
    <Helmet
      link={[
        {
          rel: 'icon',
          type: 'image/png',
          href: '/images/icons/icon.png',
        },
      ]}
      htmlAttributes={{
        lang: 'en',
      }}
      title={pageTitle}
      meta={[
        { name: 'keywords', content: metaKeywords },
        {
          name: 'description',
          content: metaDescription,
        },
        {
          property: 'og:title',
          content: pageTitle,
        },
        {
          property: 'og:description',
          content: metaDescription,
        },
        {
          property: 'og:type',
          content: 'website',
        },
        {
          name: 'twitter:card',
          content: 'summary',
        },
        {
          name: 'twitter:creator',
          content: metaAuthor,
        },
        {
          name: 'twitter:title',
          content: pageTitle,
        },
        {
          name: 'twitter:description',
          content: metaDescription,
        },
      ]}
    />
  );
};

SEO.propTypes = {
  pageName: PropTypes.string,
  siteTitle: PropTypes.string,
};

SEO.defaultProps = {
  pageName: '',
  siteTitle: 'Official site',
};

export default SEO;
