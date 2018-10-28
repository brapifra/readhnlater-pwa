import * as React from 'react';
import * as moment from 'moment';
import styled from 'styled-components';
import { BeatLoader } from 'react-spinners';

const Container = styled.div`
  font-size: 10pt;
  color: #828282;
  & a {
    :visited {
      color: #828282;
    }
    :hover{
      text-decoration: underline;
    }
    text-decoration: none;
    outline: none;
    color: black;
  }
  @media only screen and (min-width : 300px) and (max-width : 750px) {
    font-size: 11pt;
  }
`;

const Title = styled.a`
    margin-right: 5px;
    &:hover{
      text-decoration: none !important;
    }
`;

const Domain = styled.span`
    font-size: 8pt;
    &>a{
      color: #828282;
    }
`;

const AdditionalInfo = styled.div`
    line-height: 7pt;
    &>*{
      @media only screen and (min-width : 300px) and (max-width : 750px) {
        font-size: 9pt;
      }
      font-size: 7pt;
    }
    &>*:not(:last-child)::after{
      content: '|';
      margin: 0 2px;
    };
    & a {
      color: #828282;
    }
    @media only screen and (min-width : 300px) and (max-width : 750px) {
      line-height: 9pt;
    }
`;

export interface ItemProperties {
  id: number;
  deleted?: boolean;
  type?: "job" | "story" | "comment" | "poll" | "pollopt";
  by?: string;
  time?: number;
  text?: string;
  dead?: boolean;
  parent?: number;
  poll?: number;
  kids?: number[];
  url?: string;
  score?: number;
  title?: string;
  parts?: number[];
  descendants?: number;
}

export default class Item extends React.Component<ItemProperties> {
  public render() {
    if (Object.keys(this.props).length === 1 && this.props.id) {
      return (
        <Container>
          <BeatLoader color="#ff6600" size={6} />
        </Container>
      );
    }
    const { title, url, score, by, descendants, time } = this.props;
    return (
      <Container>
        <Title href={url} onMouseDown={this.onClick}>{title}</Title>
        {url ?
          <Domain>
            <a
              href={`http://${this.getUrlDomain(url)}`}
              onMouseDown={this.onClick}>{this.getUrlDomain(url)}
            </a>
          </Domain>
          : null
        }
        <AdditionalInfo>
          {score ? <span>{score} points by <a>{by}</a></span> : null}
          {time ? <span>{moment.unix(time).fromNow()}</span> : null}
          {descendants ? <a>{descendants} comments</a> : null}
        </AdditionalInfo>
      </Container>
    );
  }

  private getUrlDomain = (url: string) => (
    url ? url
      .replace('http://', '')
      .replace('https://', '')
      .replace('www.', '')
      .split(/[/?#]/)[0]
      :
      null
  )

  private onClick = (e: any) => {
    e.preventDefault();
    localStorage.setItem("lastScrollPosition", window.scrollY.toString());
  }
}