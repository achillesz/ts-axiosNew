const cookie = {
  read(name: string): string | null {
    const match = document.cookie.match(new RegExp('(^|;\\s*)(' + name + ')=([^;]*)'))

    // 0 是整个匹配值
    return match ? decodeURIComponent(match[3]) : null
  }
}

export default cookie;
