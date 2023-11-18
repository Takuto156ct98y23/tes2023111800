import classes from "./CardMessageText.module.css";
import { Fragment, useEffect, useMemo, useState } from "react";

const CardMessageText = ({ message }) => {
  return (
    <Fragment>{message && <AreaCardMessageText message={message} />}</Fragment>
  );
};

export default CardMessageText;

const SEGMENT_STR_TYPE_ORIGINAL = "SEGMENT_STR_TYPE_ORIGINAL";
// const SEGMENT_STR_TYPE_TRANSLATED = "SEGMENT_STR_TYPE_TRANSLATED";
const AreaCardMessageText = ({ message }) => {
  const segmentObjs = useMemo(() => {
    return message?.segmentObjs;
  }, [message]);

  return (
    <div>
      <Segments segmentObjs={segmentObjs} />
    </div>
  );
};

const Segments = ({ segmentObjs }) => {
  return (
    <Fragment>
      {Array.isArray(segmentObjs) && (
        <div className={classes.Segments}>
          {segmentObjs.map((segment, index) => {
            return (
              <Segment
                previousSegment={index === 0 ? null : segmentObjs[index - 1]}
                segment={segment}
                key={`Segments${index}`}
              />
            );
          })}
        </div>
      )}
    </Fragment>
  );
};

const vacantSpace = " ";

// 20230724追記：現在、このuseSegmentNextLinesは必須ではなくなっている。かつては「\n\n」や「私は\n日本人」のようなstringが混入することがあったが、今は（恐らく）無いため。しかし別にuseSegmentNextLinesを実行してもダメではないため、そのまま残している。暇があったら修正せよ。
// "\n"を取り扱うためのhook（ひと手間加えないと改行は反映されない。また反映されるにしても一工夫必要。）
const useSegmentNextLines = ({ previousSegment, segment }) => {
  /*
  以下の「★」ならtrue。「★」にSegment_nextLine_noHeightのcssがかかってしまわないようにする。

  {segmentStrOriginal: 'あなた', segmentStrTranslated: 'you', segmentStrType: 'SEGMENT_STR_TYPE_TRANSLATED'}
  {segmentStrOriginal: 'は', segmentStrTranslated: null, segmentStrType: 'SEGMENT_STR_TYPE_ORIGINAL'}
  {segmentStrOriginal: '\n', segmentStrTranslated: null, segmentStrType: 'SEGMENT_STR_TYPE_ORIGINAL'}
  {segmentStrOriginal: '\n', segmentStrTranslated: null, segmentStrType: 'SEGMENT_STR_TYPE_ORIGINAL'}（★）
  {segmentStrOriginal: '誰', segmentStrTranslated: 'who', segmentStrType: 'SEGMENT_STR_TYPE_ORIGINAL'}
  */
  const previousSegmentEndedWithNextLine = useMemo(() => {
    const segmentStrOriginal = previousSegment?.segmentStrOriginal;
    if (typeof segmentStrOriginal !== "string") {
      return false;
    }
    return segmentStrOriginal.endsWith("\n");
  }, [previousSegment]);

  // 分かち書きがうまくいかなかったりすると、"\n\n\n"のように連続することがある。その場合も反映できるようにするために、nextLinesというarrayとして取り扱う。
  const [nextLines, setNextLines] = useState(null);
  const [isNexLine, setIsNexLine] = useState(false);

  useEffect(() => {
    const segmentStrOriginal = segment?.segmentStrOriginal;
    if (typeof segmentStrOriginal !== "string") {
      return setIsNexLine(false);
    }
    const hasNextLine = segmentStrOriginal.includes("\n");
    if (!hasNextLine) {
      return setIsNexLine(false);
    }

    // segmentStrOriginalが"テスト\nテスト"のような文だったりしないか（その場合、改行としてこのsegmentStrOriginalのstr部分を非表示にしてはいけない）
    const strArray = segmentStrOriginal.split("");
    const strSet = new Set(strArray);
    const reMadeStrFromStrSet = Array.from(strSet).join();
    // これがtrueならば、１個以上の「\n」のみで構成されたstrであるということ
    const onlyNextLines = strSet.size === 1 && reMadeStrFromStrSet === "\n";
    if (!onlyNextLines) {
      return setIsNexLine(false);
    }
    setNextLines(strArray);
    setIsNexLine(true);
  }, [segment]);

  return { previousSegmentEndedWithNextLine, nextLines, isNexLine };
};

const Segment = ({ previousSegment, segment }) => {
  const { previousSegmentEndedWithNextLine, nextLines, isNexLine } =
    useSegmentNextLines({ previousSegment, segment });

  return (
    <Fragment>
      {isNexLine && Array.isArray(nextLines) ? (
        <Fragment>
          {nextLines.map((nextLine, index) => {
            if (!nextLine) {
            }
            return (
              <div
                className={`${classes.Segment_nextLine} ${
                  index === 0 && !previousSegmentEndedWithNextLine
                    ? classes.Segment_nextLine_noHeight
                    : classes.Segment_nextLine_withHeight
                }`}
                key={`Segment${index}`}
              />
            );
          })}
        </Fragment>
      ) : null}
      {segment && !isNexLine && (
        <div className={`${classes.Segment} ${""}`}>
          {segment.segmentStrType === SEGMENT_STR_TYPE_ORIGINAL ? (
            <Fragment>
              <SegmentTop str={vacantSpace} />
              <SegmentBottom str={segment.segmentStrOriginal} />
            </Fragment>
          ) : (
            <Fragment>
              <SegmentTop str={segment.segmentStrOriginal} />
              <SegmentBottom str={segment.segmentStrTranslated + " "} />
            </Fragment>
          )}
        </div>
      )}
    </Fragment>
  );
};

const SegmentTop = ({ str }) => {
  return (
    <div className={classes.SegmentTop}>
      <p className={classes.SegmentTop__str}>{str}</p>
    </div>
  );
};
const SegmentBottom = ({ str }) => {
  return (
    <div className={classes.SegmentBottom}>
      <p className={classes.SegmentBottom__str}>{str}</p>
    </div>
  );
};
