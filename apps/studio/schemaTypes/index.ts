import {pageType} from './pageType'
import {postType} from './postType'
import {commentType} from './commentType'
import {seoType} from './seoType'
import {categoryType} from './categoryType'
import {userType} from './userType'
import {heroSectionType} from './heroSectionType'
import {realitySectionType} from './realitySectionType'
import {ctaSectionType} from './ctaSectionType'
import {successStoriesSectionType} from './successStoriesSectionType'
import {industrySolutionsSectionType} from './industrySolutionsSectionType'
import siteSettingsType from './siteSettingsType'
import { resourceSectionType } from './resourceSectionType'

import { link } from './objects/link'
import { textSegment } from './objects/textSegment'
import { richTextHighlight } from './objects/richTextHighlight'
import { magicSectionType } from './magitcSectionType'
import { faqSectionType } from './faqSectionType'
import { workFlowSectionType } from './workflowSectionType'

export const schemaTypes = [
  link,
  textSegment,
  richTextHighlight,
  
  pageType,
  postType,
  commentType,
  seoType,
  categoryType,
  heroSectionType,
  realitySectionType,
  ctaSectionType,
  successStoriesSectionType,
  industrySolutionsSectionType,
  siteSettingsType,
  resourceSectionType,
  magicSectionType,
  faqSectionType,
  workFlowSectionType
  // userType
]
