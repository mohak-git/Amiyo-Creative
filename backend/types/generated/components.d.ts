import type { Schema, Struct } from '@strapi/strapi';

export interface GlobalsSocialLinks extends Struct.ComponentSchema {
  collectionName: 'components_globals_social_links';
  info: {
    displayName: 'Social Links';
    icon: 'link';
  };
  attributes: {
    platform: Schema.Attribute.Enumeration<
      ['Facebook', 'Twitter', 'Instagram', 'LinkedIn', 'GitHub', 'Other']
    > &
      Schema.Attribute.Required &
      Schema.Attribute.DefaultTo<'Other'>;
    url: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface ProjectFeatureItem extends Struct.ComponentSchema {
  collectionName: 'components_project_feature_items';
  info: {
    displayName: 'Feature Item';
    icon: 'information';
  };
  attributes: {
    description: Schema.Attribute.Text &
      Schema.Attribute.SetMinMaxLength<{
        maxLength: 300;
      }>;
    icon: Schema.Attribute.Media<'images'>;
    title: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.SetMinMaxLength<{
        maxLength: 80;
        minLength: 3;
      }>;
  };
}

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'globals.social-links': GlobalsSocialLinks;
      'project.feature-item': ProjectFeatureItem;
    }
  }
}
