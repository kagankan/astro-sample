// tailwindでも使用したいためcommonjsファイル

const breakpoints = {
  // CSS と JS で同じ値を設定する
  medium: 767,
};

module.exports = {
  breakpoints,
  spQueryString: `(max-width: ${breakpoints.medium}px)`,
  pcQueryString: `(min-width: ${breakpoints.medium + 0.02}px)`,
};
