const REDIRECTS = [
  {
    aliases: ['github', 'repositories'],
    url: 'https://github.com/bytes4guru',
    external: 1,
  },
  {
    aliases: ['linkedin', 'profile'],
    url: 'https://linkedin.com/in/thoamsf-feeney',
    external: 1,
  },
];

module.exports = class {
  data() {
    return {
      permalink: 'assets/pages.json',
    };
  }

  render({ collections }) {
    const localPages = collections.all
      .filter((i) => i.data.page.outputPath.endsWith('html'))
      .map((i) => {
        const {
          textNav: { external = false, aliases: dataAliases = [] } = {},
        } = i.data;

        const { fileSlug } = i.data.page;
        const aliases = [];

        if (fileSlug.length > 0) {
          aliases.push(fileSlug);
        }

        if (Array.isArray(dataAliases)) {
          aliases.push(...dataAliases);
        } else if (typeof dataAliases === 'string') {
          aliases.push(dataAliases);
        }

        const page = {
          aliases: Array.from(new Set(aliases)),
          url: i.data.page.url,
        };

        if (external) {
          page.external = 1;
        }

        return page;
      });

    return JSON.stringify(localPages.concat(REDIRECTS));
  }
};
