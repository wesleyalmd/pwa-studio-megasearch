module.exports = (targetables, options) => {
  const moduleOptions = {
    showMask: true,
    ...options
  };
  const { showMask } = moduleOptions;

  if (showMask) {
    /**
     * Main
     */
    const MainComponent = targetables.reactComponent(
      '@magento/venia-ui/lib/components/Main/main.js'
    );

    /* adding controlled mask */
    MainComponent.addImport(
      "import MegaSearchMask from '@magento/venia-ui/lib/components/Mask'"
    );
    MainComponent.addImport("import { useState } from 'react'");
    MainComponent.insertAfterSource(
      'isMasked } = props;\n',
      'const [megaSearchOverlay, setMegaSearchOverlay] = useState(false);\n'
    );
    MainComponent.insertAfterSource(
      '<Footer />\n',
      '<MegaSearchMask isActive={megaSearchOverlay} />\n'
    );
    MainComponent.setJSXProps('Header', {
      setMegaSearchOverlay: '{setMegaSearchOverlay}'
    });

    /**
     * Header
     */
    const HeaderComponent = targetables.reactComponent(
      '@magento/venia-ui/lib/components/Header/header.js'
    );

    /* adding controlled mask */
    HeaderComponent.insertAfterSource(
      'props => {',
      '\nconst { setMegaSearchOverlay } = props;'
    );
    HeaderComponent.addImport("import { useEffect } from 'react'");
    HeaderComponent.addImport("import { useCallback } from 'react'");
    HeaderComponent.addImport("import { useLocation } from 'react-router-dom'");
    HeaderComponent.addImport("import { useWindowSize } from '@magento/peregrine'");
    HeaderComponent.insertBeforeSource(
      'return (',
      `
    const windowSize = useWindowSize();
    const isDesktop = windowSize.innerWidth >= 1024;
    const location = useLocation();

    // close search on change page router
    useEffect(() => {
      if (isSearchOpen) {
        handleSearchTriggerClick();
      }
    }, [location]);

    // set overlay on search opened
    useEffect(() => {
      setMegaSearchOverlay(isSearchOpen);
    }, [isSearchOpen, isDesktop]);
    \n\n
  `
    );
  }

  /**
   * SearchBar
   */
  const SearchBarComponent = targetables.reactComponent(
    '@magento/venia-ui/lib/components/SearchBar/searchBar.js'
  );

  /* adding custom css */
  SearchBarComponent.addImport(
    "import megasearchClasses from '@wesleyalmd/pwa-studio-megasearch/lib/components/SearchBar/searchBar.css'"
  );
  SearchBarComponent.insertAfterSource('defaultClasses,', ' megasearchClasses,');

  /**
   * Search Autocomplete
   */
  const AutocompleteComponent = targetables.reactComponent(
    '@magento/venia-ui/lib/components/SearchBar/autocomplete.js'
  );

  /* adding custom query with special_price props */
  AutocompleteComponent.addImport(
    "import { MEGASEARCH_AUTOCOMPLETE_RESULTS } from '@wesleyalmd/pwa-studio-megasearch/lib/components/SearchBar/autocomplete.gql'"
  );
  AutocompleteComponent.insertAfterSource(
    'getAutocompleteResults: GET_AUTOCOMPLETE_RESULTS',
    ',\n...{\ngetAutocompleteResults: MEGASEARCH_AUTOCOMPLETE_RESULTS\n}\n'
  );

  /* adding custom css */
  AutocompleteComponent.addImport(
    "import megasearchClasses from '@wesleyalmd/pwa-studio-megasearch/lib/components/SearchBar/autocomplete.css'"
  );
  AutocompleteComponent.insertAfterSource('defaultClasses,', ' megasearchClasses,');

  /**
   * Suggestions
   */
  const SuggestionsComponent = targetables.reactComponent(
    '@magento/venia-ui/lib/components/SearchBar/suggestions.js'
  );

  /* adding custom css */
  SuggestionsComponent.addImport(
    "import megasearchClasses from '@wesleyalmd/pwa-studio-megasearch/lib/components/SearchBar/suggestions.css'"
  );
  SuggestionsComponent.insertAfterSource('defaultClasses,', ' megasearchClasses,');

  /* adding and controlled title show by windowSize */
  SuggestionsComponent.addImport("import { useWindowSize } from '@magento/peregrine'");
  SuggestionsComponent.insertAfterSource(
    'shouldRender } = talonProps;',
    `
      \n
      const windowSize = useWindowSize();
      const isMobile = windowSize.innerWidth < 641;
      `
  );
  SuggestionsComponent.insertBeforeSource(
    '<SuggestedCategories',
    `
    <div className={classes.categories}>
      <h2 className={classes.headingCategories}>
        <span>
          <FormattedMessage
            id={'searchBar.categories'}
            defaultMessage={'Categories'}
          />
        </span>
      </h2>\n
    `
  );
  SuggestionsComponent.insertBeforeSource(
    '<h2 className={classes.heading}>',
    '</div>\n<div className={classes.products}>\n'
  );
  SuggestionsComponent.insertAfterSource('products={items} />\n', '</div>\n');

  /* controlled limit by window size */
  SuggestionsComponent.insertAfterSource(
    '<SuggestedProducts',
    ' limit={isMobile ? 8 : 6}'
  );

  /**
   * Suggestions Categories
   */
  const SuggestionsCategoriesComponent = targetables.reactComponent(
    '@magento/venia-ui/lib/components/SearchBar/suggestedCategories.js'
  );

  /* adding custom css */
  SuggestionsCategoriesComponent.addImport(
    "import megasearchClasses from '@wesleyalmd/pwa-studio-megasearch/lib/components/SearchBar/suggestedCategories.css'"
  );
  SuggestionsCategoriesComponent.insertAfterSource(
    'defaultClasses,',
    ' megasearchClasses,'
  );

  /**
   * Suggestions Products
   */
  const SuggestionsProductsComponent = targetables.reactComponent(
    '@magento/venia-ui/lib/components/SearchBar/suggestions.js'
  );

  /* adding custom css */
  SuggestionsProductsComponent.addImport(
    "import megasearchClasses from '@wesleyalmd/pwa-studio-megasearch/lib/components/SearchBar/suggestedProducts.css'"
  );
  SuggestionsProductsComponent.insertAfterSource(
    'defaultClasses,',
    ' megasearchClasses,'
  );

  /**
   * Suggested Product
   */
  const SuggestedProductComponent = targetables.reactComponent(
    '@magento/venia-ui/lib/components/SearchBar/suggestedProduct.js'
  );

  /* adding custom css */
  SuggestedProductComponent.addImport(
    "import megasearchClasses from '@wesleyalmd/pwa-studio-megasearch/lib/components/SearchBar/suggestedProduct.css'"
  );
  SuggestedProductComponent.insertAfterSource('defaultClasses,', ' megasearchClasses,');

  /* change image size */
  SuggestedProductComponent.removeJSXProps('Image', 'width');
  SuggestedProductComponent.setJSXProps('Image', {
    width: '{120}'
  });
};
