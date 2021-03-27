import { gql } from '@apollo/client';

export const MEGASEARCH_AUTOCOMPLETE_RESULTS = gql`
  query getAutocompleteResults($inputText: String!) {
    products(search: $inputText, currentPage: 1, pageSize: 6) {
      aggregations {
        label
        count
        attribute_code
        options {
          label
          value
        }
      }
      items {
        id
        name
        small_image {
          url
        }
        url_key
        url_suffix
        price {
          regularPrice {
            amount {
              value
              currency
            }
          }
        }
        special_price
      }
      page_info {
        total_pages
      }
      total_count
    }
  }
`;
