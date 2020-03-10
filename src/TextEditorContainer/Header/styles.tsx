import styled from 'styled-components'
import { PageHeader, Col } from 'antd';

export const Header = styled(PageHeader)`
  background-color: #fafafa;

  .ant-page-header-heading-title {
    margin-bottom: 20px !important;
  }
`

export const FontStyleTitle = styled.span`
  margin-right: 5px;
`

export const ToogleCol = styled(Col)`
  padding-top: 5px;
`

export const NoSynonymsMessage = styled.span``

export const SynonymsCol = styled(Col)`
  padding-top: 4px;
`

export const Synonym = styled.span`
  margin-left: 5px;
  margin-right: 5px;
  color: blue;
  cursor: pointer;
`

export const SynonymContainer = styled.div`
  margin-left: 30px;
`