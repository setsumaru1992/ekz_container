module WebAccessor
  class FirstviewCapturer < ::WebAccessor::Base
    def initialize
    end

    def exec(url, &screenshot_processor)
      access do |accessor|
        visit(url)
        tmpfile_path = screenshot_path(url)
        accessor.save_screenshot(tmpfile_path)
        screenshot = File.open(tmpfile_path)
        yield screenshot
        FileUtils.rm(tmpfile_path)
      end
    end

    private

    def screenshot_path(url)
      Rails.root.join("tmp", "screenshot_#{url.split("?")[0].gsub(/:/, "").gsub(/\//, "")}.png")
    end

  end
end